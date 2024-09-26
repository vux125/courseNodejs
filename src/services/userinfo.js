const { sendStatus } = require('express/lib/response');
const db = require('../models/index');
const { Op, InvalidConnectionError, where } = require('sequelize');

class UserInfor {
    async getExample(student_id) {
        try {
            const user = await db.Students.findOne({
                where: {
                    student_id: {
                        [Op.eq]: student_id,
                    },
                },
            });
            return user;
        } catch (e) {
            console.error(e);
            throw e;
        };
    }
    async getPersonalInformation(student_id) {
        try {
            const user = await db.Students.findOne({
                where: {
                    student_id: {
                        [Op.eq]: student_id,
                    },
                },
                include: [{
                    model: db.Classes,
                    attributes: ['lecturer_id', 'department_id'],
                    include: [{
                        model: db.Departments,
                        attributes: ['department_name'],
                    }, {
                        model: db.Lecturers,
                        attributes: ['lecturer_id', 'name', 'phone', 'email'],
                    }],
                }],
            });
            return user;
        } catch (e) {
            console.error(e);
            throw e;
        };
    };

    //point of student 
    async infoPointOfSemester(student_id, semester_id) {
        try {
            const points = await db.Enrollments.findAll({
                where: {
                    student_id: {
                        [Op.eq]: student_id,
                    },
                },
                include: [{
                    model: db.ListRegister,
                    where: {
                        semester_id: {
                            [Op.eq]: semester_id,
                        },
                    },
                    attributes: ['semester_id', 'teach_id'],
                    include: [{
                        model: db.Teaches,
                        attributes: ['subject_id'],
                        include: [{
                            model: db.Subjects,
                            attributes: ['subject_name'],
                        }, {
                            model: db.Semesters,
                            attributes: ['semester_name'],
                        }],
                    }],

                }],
            });
            return points;
        } catch (e) {
            console.error("err getPointOfSemester");
            throw e;
        };
    };

    //Student tuition fees per semester
    async infoFeeOfStudent(student_id, semester_id) {
        try {
            const fee = await db.Enrollments.findAll({
                where: {
                    student_id: {
                        [Op.eq]: student_id,
                    }
                },
                include: [{
                    model: db.ListRegister,
                    where: {
                        semester_id: {
                            [Op.eq]: semester_id,
                        },
                    },
                    attributes: ['semester_id'],
                    include: [{
                        model: db.Semesters,
                        attributes: ['semester_name', 'fee'],
                    }, {
                        model: db.Teaches,
                        attributes: ['subject_id'],
                        include: [{
                            model: db.Subjects,
                            attributes: ['subject_name', 'credits'],
                        }],
                    }],
                }],
            });
            return fee;
        } catch (e) {
            console.error("infoFeeOfStudent")
            throw e;
        }
    }
}

module.exports = new UserInfor();