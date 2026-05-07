
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model")


const Enrollment = sequelize.define(
    "Enrollment",
    {

        id: {

            type: DataTypes.INTEGER,

            autoIncrement: true,

            primaryKey: true,

        },


        user_id: { type: DataTypes.INTEGER, allowNull: false },
        course_id: { type: DataTypes.INTEGER, allowNull: false },

        status: {
            type: DataTypes.STRING,
            defaultValue: "active", // active | disabled 
        },

    },

    {

        tableName:

            "enrollments"

    }
);

module.exports = Enrollment;


