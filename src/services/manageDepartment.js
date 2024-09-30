const { where, Op } = require('sequelize');
const db = require('../models/index');

class ManageDepartment {
    //thuộc tính private 
    #department_id;

    //khai báo giá trị cho thuộc tính
    constructor(department_id) {
        this.#department_id = department_id;
    }

    //lấy dánh sách lớp học được quản lý bởi khoa 
    async getClasses() {
        try {
            const listClasses = await db.Classes.findAll({
                where: {
                    department_id: this.#department_id,
                },
            });
            return listClasses;
        } catch (e) {
            throw e;
        }
    };

    //lấy danh sách môn học được quản lý bởi khoa
    async getSubjects() {
        try {
            const listSubjects = await db.Subjects.findAll({
                where: {
                    department_id: this.#department_id,
                },
            });
            return listSubjects;
        } catch (e) {
            throw e;
        }
    };

    //lấy danh sách giảng viên được quản lý bởi khoa
    async getLecturers() {
        try {
            const listLecturers = await db.Lecturers.findAll({
                where: {
                    department_id: this.#department_id,
                },
            });
            return listLecturers;
        } catch (e) {
            throw e;
        }
    };

    //lấy danh sách sinh viên được quản lý bởi khoa
    async getStudents() {
        try {
            const listClasses = await db.Classes.findAll({
                where: {
                    department_id: this.#department_id,
                },
            });
            const listStudents = await db.Students.findAll({
                where: {
                    [Op.in]: listClasses.class_id,
                }
            });
            return listStudents;
        } catch (e) {
            throw e;
        }
    };

    //cập nhập thông tin khoa
    async updateDepartment(infoUpdate) {
        try {
            const updepart = await db.Departments.update(
                {
                    where: {
                        department_id: this.#department_id,
                    },
                },
                {
                    department_name: infoUpdate.department_name,
                    email: infoUpdate.email,
                    phone: infoUpdate.phone,
                }
            );
            if (updepart) {
                console.log(`updateDepartment ${infoUpdate} update.`);
            } else {
                console.log(`No department found with department ${this.#department_id}.`);
            }
        } catch (e) {
            console.error("updateDepartment error");
            throw e;
        }
    }

    //cập nhập môn học
    async updateSubject(infoUpdate) {
        try {
            const upsubject = await db.Subjects.update(
                {
                    where: {
                        [Op.and]: [
                            {
                                department_id: this.#department_id,
                            }, {
                                subject_id: infoUpdate.student_id,
                            }
                        ]
                    },
                },
                {
                    subject_name: infoUpdate.subject_name,
                    credits: infoUpdate.credits,
                    department_id: infoUpdate.department_id,
                }
            );
            if (upsubject) {
                console.log(`upsubject ${infoUpdate} update.`);
            } else {
                console.log(`No subject found with department ${this.#department_id}.`);
            }
        } catch (e) {
            console.error("updateSubject error");
            throw e;
        }
    }

    //cập nhập lớp 
    async updateClass(infoUpdate) {
        try {
            const upclass = await db.Classes.update(
                {
                    where: {
                        [Op.and]: [
                            {
                                department_id: this.#department_id,
                            }, {
                                subject_id: infoUpdate.class_id,
                            }
                        ]
                    },
                },
                {
                    lecturer_id: infoUpdate.lecturer_id,
                    major: infoUpdate.major,
                    department_id: infoUpdate.department_id,
                }
            );
            if (upclass) {
                console.log(`updateClass ${infoUpdate} update.`);
            } else {
                console.log(`No class found with department ${this.#department_id}.`);
            }
        } catch (e) {
            console.error("updateSubject error");
            throw e;
        }
    }

    //thêm mới lớp 
    async insertClass(infoClass) {
        try {
            const insertclass = await db.Classes.create(
                {
                    department_id: this.#department_id,
                    class_id: infoClass.class_id,
                    lecturer_id: infoClass.lecturer_id,
                    major: infoClass.major,
                }
            );
            if (insertclass) {
                console.log(`insertclass ${infoClass} insert.`);
            } else {
                console.log(`no insertClass`);
            }
        } catch (e) {
            console.error("insertClass error");
            throw e;
        }
    }

    //thêm sinh viên
    async insertStudent(infoStudent) {
        try {
            const insertstu = await db.Students.create(
                {
                    student_id: infoStudent.student_id,
                    class_id: infoStudent.class_id,
                    address: infoStudent.address,
                    date_of_birth: infoStudent.date_of_birth,
                    email: infoStudent.email,
                    phone: infoStudent.phone,
                    gender: infoStudent.gender,
                    email2: infoStudent.email2,
                    place_of_birth: infoStudent.place_of_birth,
                    ethnicity: infoStudent.ethnicity,
                    religion: infoStudent.religion,
                    presence: infoStudent.presence,
                    house_regis: infoStudent.house_regis,
                    image: infoStudent.image,
                }
            );
            if (insertstu) {
                console.log(`insertStudent ${infoStudent} insert.`);
            } else {
                console.log(`no insertStudent`);
            }
        } catch (e) {
            console.error("insertStudent error");
            throw e;
        }
    }

    //thêm môn học
    async insertSubject(infoSubject) {
        try {
            const insertsubject = await db.Subjects.create(
                {
                    department_id: this.#department_id,
                    subject_id: infoSubject.class_id,
                    subject_name: infoUpdate.subject_name,
                    credits: infoUpdate.credits,
                }
            );
            if (insertsubject) {
                console.log(`insertsubject ${infoSubject} insert.`);
            } else {
                console.log(`no insertsubject`);
            }
        } catch (e) {
            console.error("insertSubject error");
            throw e;
        }

    }

    //xóa lớp
    async deleteClass(class_id) {
        try {
            const deleteclass = await db.Classes.destroy(
                {
                    where: {
                        [Op.and]: [
                            {
                                department_id: this.#department_id,
                            }, {
                                class_id: class_id,
                            }
                        ],
                    },
                }
            );
            if (deleteclass) {
                console.log(`class deleted.`);
            } else {
                console.log(`No class found with ID ${class_id} in department ${this.#department_id}.`);
            }
        } catch (e) {
            console.error("deleteClass error");
            throw e;
        }
    }

    //xóa sinh viên
    async deleteStudent(student_id) {
        try {
            const deletestu = await db.Students.destroy(
                {
                    where: {
                        student_id: student_id,
                    },
                    include: {
                        model: db.Classes,
                        where: {
                            department_id: this.#department_id,
                        }
                    }
                }
            );
            if (deletedStudent) {
                console.log(`Student with ID ${student_id} deleted.`);
            } else {
                console.log(`No student found with ID ${student_id} in department ${this.#department_id}.`);
            }
        } catch (e) {
            console.error("deleteStudent error");
            throw e;
        }
    }

    //xóa subject
    async deleteSubject(subject_id) {
        try {
            const deletesub = await db.Subjects.destroy(
                {
                    where: {
                        [Op.and]: [
                            {
                                subject_id: subject_id,
                            }, {
                                department_id: this.#department_id,
                            }
                        ]
                    },
                }
            );
            if (deletesub) {
                console.log(`Subject deleted.`);
            } else {
                console.log(`No subject found with ID ${subject_id} in department ${this.#department_id}.`);
            }
        } catch (e) {
            console.error("deleteSubject error");
            throw e;
        }
    }

}

module.exports = new ManageDepartment();