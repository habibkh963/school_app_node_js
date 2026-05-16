const { Enrollment, User, Courses } = require("../models");

class EnrollmentController {
    // GET ALL (only current user enrollments OR admin later)
    static async getAll(req, res) {
        try {
            const user_id = req.user.id;

            const user = await User.findOne({
                where: {
                    id: user_id,

                },
            });

            // check role
            if (user.type !== "student") {
                return res.status(403).json({
                    success: false,
                    message: "Only students can access enrollments",
                });
            }

            const enrollments = await Enrollment.findAll({
                where: {
                    user_id: user.id,
                },
                include: [
                    {
                        model: Courses,
                        include: [
                            {
                                model: User, // teacher

                            },
                        ],
                    },
                ],
            });
            console.log(enrollments[0].Course);

            res.status(200).json({

                success: true,
                data: enrollments.map((e) => ({
                    course: {
                        id: e.Course.id,
                        name: req.lang === "ar" ? e.Course.name_ar : e.Course.name_en,
                        description: req.lang === "ar" ? e.Course.description_ar : e.Course.description_en,
                        teacher: e.Course.User.name,
                        teacherID: e.Course.User.id
                    },
                    enrollment: {
                        id: e.id,
                        status: e.status,
                    },
                })),
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // CREATE ENROLLMENT (student enroll to course)
    static async create(req, res) {
        try {
            const user_id = req.user.id;

            const user = await User.findOne({
                where: {
                    id: user_id,

                },
            });
            const { course_id } = req.body;

            if (user.type !== "student") {

                return res.status(403).json({
                    success: false,
                    message: "Only students can enroll",
                });
            }

            // check if already enrolled
            const exists = await Enrollment.findOne({
                where: {
                    user_id: user.id,
                    course_id,
                },
            });

            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: "Already enrolled in this course",
                });
            }

            const enrollment = await Enrollment.create({
                user_id: user.id,
                course_id,
                status: "active",
            });

            res.status(201).json({
                success: true,
                data: enrollment,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // UPDATE STATUS (admin or maybe teacher later)
    static async updateStatus(req, res) {
        try {
            const user = req.user;

            const { id } = req.params;
            const { status } = req.body;

            if (!["active", "disabled"].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid status",
                });
            }

            const enrollment = await Enrollment.findByPk(id);

            if (!enrollment) {
                return res.status(404).json({
                    success: false,
                    message: "Enrollment not found",
                });
            }

            enrollment.status = status;
            await enrollment.save();

            res.status(200).json({
                success: true,
                data: enrollment,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // DELETE enrollment
    static async delete(req, res) {
        try {
            const user = req.user;

            const { id } = req.params;

            const enrollment = await Enrollment.findByPk(id);

            if (!enrollment) {
                return res.status(404).json({
                    success: false,
                    message: "Enrollment not found",
                });
            }

            // student can delete only his own enrollment
            if (user.type === "student" && enrollment.user_id !== user.id) {
                return res.status(403).json({
                    success: false,
                    message: "Not allowed",
                });
            }

            await enrollment.destroy();

            res.status(200).json({
                success: true,
                message: "Enrollment deleted",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = EnrollmentController;