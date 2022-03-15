const sequelize = require('sequelize');
const database = require('../database/connection');
const user = require('./user');
const post = require('./post');

const comment = database.define(
    "comment",
    {

        comment_id:{
            type: sequelize.BIGINT(),
            autoIncrement: true,
            primaryKey: true,
        },
        post_comment:{
            type: sequelize.STRING(255),
        },


 // It is possible to add foriegn keys:


        post_id:{
            type : sequelize.BIGINT(),

        references:{
            //This is for reference  to another table
            model: "post",
            
            //This is the coulmn name of referenced table
            key: "post_id",
        },
        },

        user_id:{
            type : sequelize.BIGINT(),
        references:{
            model: "user",
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
    tableName: "comment",


  });

  
  comment.belongsTo(post, {foreignKey: 'post_id'});
  post.hasMany(comment,{ foreignKey: 'post_id'});

  comment.belongsTo(user, {foreignKey: 'user_id'});
  user.hasMany(comment, { as: 'comment' , foreignKey: 'user_id'});

  module.exports = comment;
