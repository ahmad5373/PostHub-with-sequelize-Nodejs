 const sequelize = require('sequelize');
 const database = require('../database/connection');

 const user = database.define(
     "user", 
     {
         user_id : {
             type: sequelize.BIGINT(),
             primaryKey : true,
             autoIncrement: true,
         },

         Name:{
             type: sequelize.STRING(255),
         },

         phone :{
             type: sequelize.STRING(11),
             unique : true,
         },

         email:{
             type: sequelize.STRING(40),
             unique : true,
             required: true,
             allownull: false,
         },
         address:{
             type: sequelize.STRING(255),
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
        tableName: "user",


      });
 module.exports = user;