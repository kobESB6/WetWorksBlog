const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

// Initialize the Comment model with its schema
Comment.init(
  {
    // Define the primary key for the Comment table
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the body field for the Comment
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass in the sequelize instance for connection
    freezeTableName: true, // Ensure the table name is the same as the model name
    underscored: true, // Use underscores instead of camelCase for column names
    modelName: 'comment', // Name the model
  }
);

module.exports = Comment;
