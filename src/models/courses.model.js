const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Users = require("./user.model");

const Courses = sequelize.define(
    "Courses",
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name_ar: { type: DataTypes.STRING, allowNull: false },
        name_en: { type: DataTypes.STRING, allowNull: false },
        description_ar: { type: DataTypes.TEXT },
        description_en: { type: DataTypes.TEXT },
        price: { type: DataTypes.FLOAT, allowNull: false },
        teacherId: {
            type: DataTypes.INTEGER,
            references: { model: "users", key: "id" },
        },
    },
    { tableName: "courses" }
);

// Relation
Users.hasMany(Courses, { foreignKey: "teacherId" });
Courses.belongsTo(Users, { foreignKey: "teacherId" });

module.exports = Courses;
