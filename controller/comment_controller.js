const express = require('express');
const comment = require('../models/comment');


//End point for create a new comment
exports.createcomment = async (req, res, next) => {
    try {
      if (!req.body) {
        res.status(302).send({
          message: "content can not be empty!",
        });
         
        return;
      }
      //Create a new comment
      const commen = {
        post_comment: req.body.post_comment,
        post_id: req.body.post_id,
        user_id: req.body.user_id,
      };

    
    //    //Check if email/phone no is already exist then throw error
    // const checkuserid = req.body.user_id;
    // const checkpostid = req.body.post_id;
    // const found = await vote.findOne({
    //   where: {
    //     [Op.and]: [{ user_id: checkuserid }, { post_id: checkpostid }],
    //   },
    // });
    // console.log("check", checkuserid, checkpostid);

    // // if found show error  vote on this post  exist already
    // if (found) {
    //   res.send("your  vote on this post   is already exist ");
    //   console.log("found", found);
    // } else {

      // Save comment in database
      const dt = await comment.create(commen);
      return res.send({ data: dt });
    
    } catch (error) {
      console.log("error!", error);
      res.status(500).send({
        message: error.message || "some Error occure while creating comment",
      });
    }
  };

  //Retrieve  all comment
exports.getcomment = async (req, res, next) => {
    try {
      const data = await comment.findAll({});
  
      res.send({ data });
    } catch (error) {
      console.log("Error", error);
      return res.status(302).send({
        message: "could not get comment",
      });
    }
  };

  //Retrieve  comment With id
exports.get = async (req, res, next) => {
    try {
        const comment_id = req.params.id
      const data = await comment.findOne({
          where:{
              comment_id: comment_id,
          },
      });
      if (data !== null) {
        res.status(200).json({
          Data: data,
        });
        console.log("data", data);
      } else {
        res.status(404).json({
          message: `cannot find comment with id=${comment_id}.`,
        });
      }
    } catch (error) {
      console.log("Error", error);
      return res.status(302).send({
        message: "could not get comment",
      });
    }
  };

   //Update comment by id
exports.update = async (req, res, next) => {
    try {
      const comment_id = req.params.id;
      const data = await comment.update(req.body, {
        where: {
            comment_id: comment_id,
        },
      });
      if (data !== null) {
        res.status(200).json({
          message: `comment has been updated  Successfuly with id =${comment_id}.`,
        });
      } else {
        res.status(400).json({
          message: `comment connot be updated with id=${comment_id}.`,
        });
      }
    } catch (error) {
      res.status(505).json({
        error: error.message,
      });
    }
  };
  
  //Delete comment by id
  exports.delete = async (req, res, next) => {
    try {
      const comment_id = req.params.id;
      console.log(req.body);
      const data = await comment.destroy({
        where: {
            comment_id: comment_id,
        },
      });
      if (data !== null) {
        res.status(200).json({
          message: `comment has been deleted Successfuly with id =${comment_id}.`,
        });
      } else {
        res.status(400).json({
          message: `comment connot be deleted with id=${comment_id}.`,
        });
      }
    } catch (error) {
      res.status(505).json({
        error: error.message,
      });
    }
  };