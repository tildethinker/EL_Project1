// Project idea schema/model

// models/projectModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  privacy: {
    type: DataTypes.ENUM('public', 'private'),
    defaultValue: 'public',
  },
  skillsNeeded: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
}, {
  timestamps: true,
});

// Association
Project.belongsTo(User, { foreignKey: 'userId', as: 'owner' });
User.hasMany(Project, { foreignKey: 'userId', as: 'projects' });

module.exports = Project;
