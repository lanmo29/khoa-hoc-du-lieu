'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         */
        static associate(models) {
            // Each comment belongs to one user
            Comment.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
            // Each comment belongs to one company
            Comment.belongsTo(models.Company, {
                foreignKey: 'companyId',
                as: 'company'
            });
        }
    };
    Comment.init({
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        companyId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Comment',
        timestamps: true
    });
    return Comment;
};
