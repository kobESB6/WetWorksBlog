const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

// Initialize the Post model with its schema
Post.init(
  {
    // Define the primary key for the Post table
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the title field for the Post
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the body field for the Post
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass in the sequelize instance for connection
    freezeTableName: true, // Ensure the table name matches the model name
    underscored: true, // Use underscores instead of camelCase for column names
    modelName: 'post', // Name the model
  }
);

module.exports = Post;
