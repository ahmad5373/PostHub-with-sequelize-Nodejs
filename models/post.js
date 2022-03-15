const sequelize = require('sequelize');
const database = require('../database/connection');
const user = require('../models/user');

const post = database.define(
    "post",
    {
        post_id:{
            type: sequelize.BIGINT(),
            autoIncrement: true,
            primaryKey: true,
        },
      
    description: {
        type: sequelize.STRING(255),
      },
  
      createdAt: {
        type: sequelize.DATE(),
      },
  
  
          // it is possible to add foriegn keys:
         user_id: {
        type: sequelize.BIGINT(),
        allowNull: false,
        

        refrences: {        
              //This is for reference  to another table
          model: "user",

          //This is the coulmn name of referenced table
          key: "user_id",
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
      tableName: "post",
    }
  );
  
  
  post.belongsTo(user, {foreignKey: 'user_id'});
  user.hasMany(post,{foreignKey: 'user_id'});
  
  module.exports = post;
  