const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model")



const Grades = sequelize.define(
    "Grades",
    {

        id: {

            type: DataTypes.INTEGER,

            autoIncrement: true,

            primaryKey: true,

        },


        user_id: { type: DataTypes.INTEGER, allowNull: false },
        course_id: { type: DataTypes.INTEGER, allowNull: false },

        grade: {
            type: DataTypes.DOUBLE,
            defaultValue: 0,
        },
        pass: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    },

    {

        tableName:

            "grades",
        timestamps: true,
    }
);

module.exports = Grades;
