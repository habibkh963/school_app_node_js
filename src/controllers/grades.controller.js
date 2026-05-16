const { Grades, User, Courses } = require("../models");

class GradesController {
    // GET ALL
    static async getAll(req, res) {
        try {
            const userId = req.body.user_id;

            const grades = await Grades.findAll({
                where: {
                    user_id: userId,
                },
                include: [User, Courses],
            });
            console.log(grades);
            if (!grades) {
                res.status(200).json({
                    success: true,
                    data: [],
                });
            }
            res.status(200).json({
                success: true,
                data: grades,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // GET BY ID
    static async getById(req, res) {
        try {
            const { id } = req.params;

            const grade = await Grades.findByPk(id, {
                include: [User, Courses],
            });

            if (!grade) {
                return res.status(404).json({
                    success: false,
                    message: "Grade not found",
                });
            }

            res.status(200).json({
                success: true,
                data: grade,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // CREATE
    static async create(req, res) {
        try {
            const { user_id, course_id, grade, pass } = req.body;
            const senderID = req.user.id;
            const user = await User.findOne({
                where: {
                    id: senderID,

                },
            });

            // check role
            if (user.type !== "teacher") {
                return res.status(403).json({
                    success: false,
                    message: "Only Teacher can access grades",
                });
            }
            // optional: check if already exists
            const exists = await Grades.findOne({
                where: { user_id, course_id },
            });

            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: "Grade already exists for this user in this course",
                });
            }

            const newGrade = await Grades.create({
                user_id,
                course_id,
                grade,
                pass: pass ?? grade >= 50, // auto pass logic
            });

            res.status(201).json({
                success: true,
                data: newGrade,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // UPDATE
    static async update(req, res) {
        try {
            const { id } = req.params;

            const grade = await Grades.findByPk(id);

            if (!grade) {
                return res.status(404).json({
                    success: false,
                    message: "Grade not found",
                });
            }

            const updatedData = {
                ...req.body,
            };

            // auto update pass if grade changed
            if (updatedData.grade !== undefined) {
                updatedData.pass = updatedData.grade >= 50;
            }

            await grade.update(updatedData);

            res.status(200).json({
                success: true,
                data: grade,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // DELETE
    static async delete(req, res) {
        try {
            const { id } = req.params;

            const grade = await Grades.findByPk(id);

            if (!grade) {
                return res.status(404).json({
                    success: false,
                    message: "Grade not found",
                });
            }

            await grade.destroy();

            res.status(200).json({
                success: true,
                message: "Grade deleted successfully",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = GradesController;