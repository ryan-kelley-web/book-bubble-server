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
        },
        //dropdown
        rating: {
            type: DataTypes.STRING
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
        },
        //LC added this - include a dropdown with read, reading, or to-read
        read_status: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        //LC added this - need this to get results by user
        owner_id: {
            type: DataTypes.INTEGER
        }
    });

    return Book;
};

