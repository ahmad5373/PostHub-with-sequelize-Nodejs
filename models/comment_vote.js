const sequelize = require('sequelize');
const database = require('../database/connection');
const user = require('../models/user');
const comment = require('../models/comment');

const comment_vote = database.define(
    "comment_vote" ,
    {
        comment_vote_id:{
            type:sequelize.BIGINT(),
            autoIncrement: true,
            primaryKey: true,

        },
          // It is possible to add foriegn keys:


          comment_id:{
            type : sequelize.BIGINT(),

        references:{
            //This is for reference  to another table
            model: "comment",
            
            //This is the coulmn name of referenced table
            key: "comment_id",
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
    tableName: "comment_vote",


  });

  
  comment_vote.belongsTo(comment, {foreignKey: 'comment_id'});
  comment.hasMany(comment_vote,{ foreignKey: 'comment_id'});

  comment_vote.belongsTo(user, {foreignKey: 'user_id'});
  user.hasOne(comment_vote, { as: 'comment_votes' , foreignKey: 'user_id'});

  module.exports = comment_vote;