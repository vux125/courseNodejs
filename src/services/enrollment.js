const db = require('../models/index');

class Enrollments {

    //lấy danh sách môn học theo từng sinh viên
    async getListRegister(student_id, semester_id) {
        try {
            const departStu = await db.Students.findOne({
                where: {
                    student_id: student_id,
                },
                include: [{
                    model: db.Classes,
                    attributes: ['department_id'],
                }]
            });
            const depart = await db.ListRegister.findAll({
                where: {
                    semester_id: semester_id,
                },
                include: [{
                    model: db.Teaches,
                    include: [{
                        model: db.Subjects,
                        where: {
                            department_id: departStu.Classes.department_id,
                        }
                    }]
                }]
            });
            return depart;
        } catch (e) {
            console.log("getListRegister");
            throw e;
        }
    }

    //cập nhập đăng ký
    async updateRegistry(student_id, classroom_id) {
        try {
            const classroomSub = await db.ListRegister.findOne({
                where: {
                    classroom_id: classroom_id,
                },
                include: {
                    model: db.Teaches,
                    attributes: ['subject_id'],
                }
            });

            const findRegis = await db.Enrollments.findAll({
                where: {
                    student_id: student_id,
                },
                include: {
                    model: db.ListRegister,
                    include: {
                        mode: db.Teaches,
                        where: {
                            subject_id: classroomSub.Teaches.subject_id,
                        }
                    }
                }
            });

            if (findRegis == null) {
                const regis = await db.Enrollments.create({
                    student_id: student_id,
                    classroom_id: classroom_id,
                });
                return regis;
            } else {
                const regis = await db.Enrollments.update({
                    classroom_id: classroom_id,
                    where: {
                        student_id: student_id,
                    }
                });
                return regis;
            }
        } catch (e) {
            console.log("updateRegistry");
            throw e;
        }
    }
}

module.exports = new Enrollments();