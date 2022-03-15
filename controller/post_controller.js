const express = require('express');
const post = require('../models/post');


//create A new post and save in database
exports.createpost = async (req, res, next) => {
    try {
      if (!req.body) {
          
        res.status(302).send({
          message: "content can not be empty!",

        });

        return;
        
      }
      //Create a new Post
      const pos = {
        description: req.body.description,
        createdAt: req.body.createdAt,
        user_id: req.body.user_id,
        
      };
      // Save post in database
      const dt = await post.create(pos);
      return res.send({ data: dt });
    } catch (error) {
      console.log("error!", error);
      res.status(500).send({
        message: error.message || "some Error occure while creating post",
      });
    }
  };


  //Retrieve  all Post
exports.getpost = async (req, res, next) => {
    try {
      const data = await post.findAll({
        
      });
  
      res.send({ data });
    } catch (error) {
      console.log("Error", error);
      return res.status(302).send({
        message: "could not get post",
      });
    }
  };
  
  
//Get Post by specific id
exports.get = async (req, res, next) => {
    try {
      const post_id = req.params.id;
      const data = await post.findOne({
        where: { post_id: post_id, deletedAt: null },
      });
      console.log("id", post_id);
      if (data !== null) {
        res.status(200).json({
          Data: data,
        });
        console.log("data", data);
      } else {
        res.status(404).json({
          message: `cannot find Post with id=${post_id}.`,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(302).json({
        error: error.message,
      });
    }
  };

  //Update Post by id
exports.update = async (req, res, next) => {
    try {
      const post_id = req.params.id;
      const data = await post.update(req.body, {
        where: {
            post_id: post_id,
        },
      });
      if (data !== null) {
        res.status(200).json({
          message: `post has been updated successfuly with id =${post_id}.`,
        });
      } else {
        res.status(400).json({
          message: `post connot be updated with id=${post_id}.`,
        });
      }
    } catch (error) {
      res.status(505).json({
        error: error.message,
      });
    }
  };

  //Delete Post by id
exports.delete = async (req, res, next) => {
    try {
      const post_id = req.params.id;
      const data = await post.destroy({
        where: {
            post_id: post_id,
        },
      });
      if (data !== null) {
        res.status(200).json({
          message: `post has been deleted successfuly with id =${post_id}.`,
        });
      } else {
        res.status(400).json({
          message: `post connot be deleted with id=${post_id}.`,
        });
      }
    } catch (error) {
      res.status(505).json({
        error: error.message,
      });
    }
  };