const sequelize = require('sequelize');
const database = require('../database/connection');
const profile = require('../models/profile');

const experience = database.define(
    "experience",
    {
        experience_id:{
            type: sequelize.BIGINT(),
            autoIncrement: true,
            primaryKey: true,
        },
        from: {
            type: sequelize.DATE(),
          },
          to: {
            type: sequelize.DATE(),
          },
      
          current: {
            type: sequelize.BOOLEAN(),
          },
      
          // It is possible to create foreign keys:
          profile_id: {
            type: sequelize.BIGINT(),
      
            references: {
              // This is a reference to another model
              model: 'profile',
      
              // This is the column name of the referenced model
              key: "profile_id",
            },
          },
        },
      
        {
          paranoid: true,
          timestamps: true,
          // disable the modification of tablenames; By default, sequelize will automatically
          // transform all passed model names (first parameter of define) into plural.
          // if you don't want that, set the following
          freezeTableName: true,
          // define the table's name
          tableName: "experience",
        }
      );
      
      
      experience.belongsTo(profile, {foreignKey: 'profile_id'});
      profile.hasMany(experience,{foreignKey: 'profile_id'});
      
      module.exports = experience;