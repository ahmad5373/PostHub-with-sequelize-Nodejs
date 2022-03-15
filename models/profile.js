const sequelize = require('sequelize');
const database = require('../database/connection');
const user = require('../models/user');


const profile = database.define(
    "profile",
    {
        profile_id:{
            type: sequelize.BIGINT(),
            autoIncrement: true,
            primaryKey: true,
        },

        title:{
            type:sequelize.STRING(255),
        },

        about: {
            type: sequelize.STRING(255),
        },
        
        // it is possible to add foriegn keys:
        user_id :{
            type: sequelize.BIGINT(),
            unique: true,

            references:{
                //this is for references to another table
                model: 'user',

                // This is the column name of the referenced model
        key: 'user_id'
            }
        }

    },
    {
        paranoid: true,
        timestamps: true,
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true, 
        // define the table's name
        tableName: "profile",
      });
      
 profile.belongsTo(user, {foreignKey: 'user_id'});
 user.hasOne(profile,{foreignKey: 'user_id'});

      module.exports = profile;