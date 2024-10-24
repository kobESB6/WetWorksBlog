const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // Method to check if the provided password matches the hashed password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize the User model with its schema
User.init(
  {
    // Define the primary key for the User table
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the username field for the User
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the password field with validation
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Password must be at least 8 characters long
      },
    },
  },
  {
    hooks: {
      // Hash the user's password before saving a new user to the database
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Hash the user's password before updating the user's record
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize, // Pass in the sequelize instance for connection
    freezeTableName: true, // Ensure the table name matches the model name
    underscored: true, // Use underscores instead of camelCase for column names
    modelName: 'user', // Name the model
  }
);

module.exports = User;
