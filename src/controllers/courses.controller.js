/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */


const User = require("../models/user.model");
const Enrollment = require("../models/enrollments.model");

const Course = require("../models/courses.model");
const sequelize = require("sequelize");
exports.createCourse = async (req, res) => {
    try {

        const { name_en, name_ar, description_en, description_ar, price, teacherId } = req.body;
        const user = await User.findByPk(teacherId);
        if (!user) {
            res.status(500).json({ message: req.t.NOT_FOUND });
        }

        const course = await Course.create({ name_en, name_ar, description_ar, description_en, price, teacherId });
        res.status(201).json(course);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: req.t.SERVER_ERROR });
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
// exports.getProducts = async (req, res) => {
//     try {



//         const products = await Product.findAll({ include: Category });


//         const localizedProducts = products.map((p) => ({
//             id: p.id,
//             name: req.lang === "ar" ? p.name_ar : p.name_en,
//             description: req.lang === "ar" ? p.description_ar : p.description_en,
//             price: p.price,
//             categoryId: p.categoryId,
//             category: {
//                 id: p.Category.id,
//                 name: req.lang === "ar" ? p.Category.name_ar : p.Category.name_en,
//             },
//         }));

//         return res.json(localizedProducts);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: req.t.SERVER_ERROR });
//     }
// };

exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_en, name_ar, description_en, description_ar, price, teacherId } = req.body;

        const course = await Course.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: req.t.PRODUCT_NOT_EXISTS });
        }
        const updates = {};

        if (name_en !== undefined) updates.name_en = name_en;
        if (name_ar !== undefined) updates.name_ar = name_ar;
        if (description_en !== undefined) updates.description_en = description_en;
        if (description_ar !== undefined) updates.description_ar = description_ar;
        if (price !== undefined) updates.price = price;
        if (teacherId !== undefined) updates.teacherId = teacherId;
        if (teacherId) {
            const user = await User.findByPk(teacherId);
            if (!user) {
                return res.status(400).json({ message: req.t.CATEGORY_NOT_EXISTS });
            }
        }

        await course.update(updates);
        await course.reload();
        res.status(200).json({
            data: course,
            msg: req.t.PRODUCT_UPDATED
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: req.t.SERVER_ERROR });
    }
};
exports.getCourses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const search = req.query.search || "";

        const where =
            search.length > 0
                ? {
                    [sequelize.Op.or]: [
                        { name_en: { [sequelize.Op.like]: `%${search}%` } },
                        { name_ar: { [sequelize.Op.like]: `%${search}%` } },
                    ],
                }
                : {};

        const { count, rows } = await Course.findAndCountAll({
            where,
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "email"],
                }
                ,
                {
                    model: Enrollment,

                    where: { user_id: req.user.id },
                    required: false, //if true only products that has favourites will back
                    attributes: ["id"],
                },


            ],
            limit,
            offset,
            order: [["id", "DESC"]],
        });
        console.log(rows);
        const localizedProducts = rows.map((p) => ({
            id: p.id,
            name: req.lang === "ar" ? p.name_ar : p.name_en,
            description: req.lang === "ar" ? p.description_ar : p.description_en,
            price: p.price,
            is_enrolled: p.Enrollments.length > 0,

            teacherId: p.teacherId,
            teacher: {
                id: p.User.id,
                name: p.User.name, name: p.User.email,
            },
        }));

        const totalPages = Math.ceil(count / limit);

        return res.status(200).json({
            data: localizedProducts,
            pagination: {
                totalItems: count,
                totalPages,
                currentPage: page,
                limit,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: req.t.SERVER_ERROR });
    }
};
