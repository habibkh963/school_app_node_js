const sequelize = require("../config/db");

const User = require("./user.model");

const Courses = require("./courses.model");
const Grades = require("./grades.model");
// const Cart = require("./cart.model");

// const CartItem = require("./cart.item.model");

const Enrollment = require("./enrollments.model");

/* Relations */
// User.hasOne(Cart, { foreignKey: "user_id" });

// Cart.belongsTo(User, { foreignKey: "user_id" });

// Cart.hasMany(CartItem, { foreignKey: "cart_id", as: "cart_items" });

// CartItem.belongsTo(Cart, { foreignKey: "cart_id", as: "cart", });

// Product.hasMany(CartItem, { foreignKey: "product_id" });

// CartItem.belongsTo(Product, { foreignKey: "product_id", as: 'product' });
//orders 
User.hasMany(Enrollment, { foreignKey: "user_id" });

Enrollment.belongsTo(User, { foreignKey: "user_id" });
Courses.hasMany(Enrollment, {
    foreignKey: "course_id",

});

Enrollment.belongsTo(Courses, {
    foreignKey: "course_id",

});
User.hasMany(Grades, {
    foreignKey: "user_id",

});
Grades.belongsTo(User, {
    foreignKey: "user_id",

});
Courses.hasOne(Grades, {
    foreignKey: "course_id",

});
Grades.belongsTo(Courses, {
    foreignKey: "course_id",

});


// Order.belongsTo(Cart,);

// Cart.hasOne(Order,);



module.exports = {

    sequelize,

    User,

    Courses,


    Enrollment,
    Grades,


};
