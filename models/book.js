const sequelize = require("../db");

module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('book', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }, 

        author: {
            type: DataTypes.STRING,
            allowNull: false
        },

        total_pages: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        //dropdown
        rating: {
            type: DataTypes.INTEGER
        }, 
        //dropdown
        genre: {
            type: DataTypes.STRING
        }, 

        description: {
            type: DataTypes.STRING
        }, 

        year_published: {
            type: DataTypes.INTEGER
        }

    });

    return Book;
};

