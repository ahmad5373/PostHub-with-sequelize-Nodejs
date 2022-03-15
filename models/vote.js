const sequelize = require("sequelize");
const database = require("../database/connection");
const post = require("../models/post");
const user = require("../models/user");


const vote = database.define(
    "vote",
    {
        vote_id:{
            type : sequelize.BIGINT(),
            primaryKey: true,
            autoIncrement: true,
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
    tableName: "vote",


  });

  
  vote.belongsTo(post, {foreignKey: 'post_id'});
  post.hasMany(vote,{ foreignKey: 'post_id'});

  vote.belongsTo(user, {foreignKey: 'user_id'});
  user.hasOne(vote, { as: 'votes' , foreignKey: 'user_id'});

  module.exports = vote;