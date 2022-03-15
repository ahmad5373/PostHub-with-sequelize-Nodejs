const express = require('express');
const comment_vote = require('../models/comment_vote');

const sequelize = require('sequelize');
const Op = sequelize.Op;

//End point for create a new Vote
exports.createcommentvote = async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(302).send({
        message: "content can not be empty!",
      });
       
      return;
    }
    //Create a new vote
    const coomenvot = {
      comment_id: req.body.comment_id,
      user_id: req.body.user_id,
    };

  
     //Check if user already vote on this post then throw error
  const checkuserid = req.body.user_id;
  const checkcomment_id = req.body.comment_id;
  const found = await comment_vote.findOne({
    where: {
      [Op.and]: [{ user_id: checkuserid }, { comment_id: checkcomment_id }],
    },
  });
  console.log("check", checkuserid, checkcomment_id);

  // if found show error  vote on this post  exist already
  if (found) {
    res.send("your  vote on this post   is already exist ");
    console.log("found", found);
  } else {
    // Save user in database
    const dt = await comment_vote.create(coomenvot);
    return res.send({ data: dt });
  }
  } catch (error) {
    console.log("error!", error);
    res.status(500).send({
      message: error.message || "some Error occure while creating vote",
    });
  }
};

//Retrieve  all vote
exports.getcomment_vot = async (req, res, next) => {
  try {
    const data = await comment_vote.findAll({});

    res.send({ data });
  } catch (error) {
    console.log("Error", error);
    return res.status(302).send({
      message: "could not get comment_vot",
    });
  }
};

//Get Comment_Vote by specific id
exports.get = async (req, res, next) => {
  try {
    const comment_vote_id = req.params.id;
    const data = await comment_vote.findOne({
      where: { comment_vote_id: comment_vote_id, deletedAt: null },
    });
    console.log("id", comment_vote_id);
    if (data !== null) {
      res.status(200).json({
        Data: data,
      });
      console.log("data", data);
    } else {
      res.status(404).json({
        message: `cannot find comment_vote with id=${comment_vote_id}.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(302).json({
      error: error.message,
    });
  }
};

//Update vote by id
exports.update = async (req, res, next) => {
  try {
    const comment_vote_id = req.params.id;
    const data = await comment_vote.update(req.body, {
      where: {
        comment_vote_id: comment_vote_id,
      },
    });
    if (data !== null) {
      res.status(200).json({
        message: `comment_vote has been updated  Successfuly with id =${comment_vote_id}.`,
      });
    } else {
      res.status(400).json({
        message: `comment_vote connot be updated with id=${comment_vote_id}.`,
      });
    }
  } catch (error) {
    res.status(505).json({
      error: error.message,
    });
  }
};

//Delete vote by id
exports.delete = async (req, res, next) => {
  try {
    const comment_vote_id = req.params.id;
    console.log(req.body);
    const data = await comment_vote.destroy({
      where: {
        comment_vote_id: comment_vote_id,
      },
    });
    if (data !== null) {
      res.status(200).json({
        message: `comment_vote has been deleted Successfuly with id =${comment_vote_id}.`,
      });
    } else {
      res.status(400).json({
        message: `comment_vote connot be deleted with id=${comment_vote_id}.`,
      });
    }
  } catch (error) {
    res.status(505).json({
      error: error.message,
    });
  }
};
