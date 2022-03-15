const express = require('express');
const vote = require('../models/vote');
const user = require ('../models/user');
const post = require('../models/post');


const sequelize = require('sequelize');
const Op = sequelize.Op;

//End point for create a new Vote
exports.createvote = async (req, res, next) => {
    try {
      if (!req.body) {
        res.status(302).send({
          message: "content can not be empty!",
        });
         
        return;
      }
      //Create a new vote
      const vot = {
        post_id: req.body.post_id,
        user_id: req.body.user_id,
      };

    
       //Check if user already vote on this post then throw error
    const checkuserid = req.body.user_id;
    const checkpostid = req.body.post_id;
    const found = await vote.findOne({
      where: {
        [Op.and]: [{ user_id: checkuserid }, { post_id: checkpostid }],
      },
    });
    console.log("check", checkuserid, checkpostid);

    // if found show error  vote on this post  exist already
    if (found) {
      res.send("your  vote on this post   is already exist ");
      console.log("found", found);
    } else {
      // Save user in database
      const dt = await vote.create(vot);
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
exports.getvote = async (req, res, next) => {
    try {
      const data = await vote.findAll({});
  
      res.send({ data });
    } catch (error) {
      console.log("Error", error);
      return res.status(302).send({
        message: "could not get vote",
      });
    }
  };

  //Retrieve   vote with  post
exports.getvotpost = async (req, res, next) => {
    try {
      const data = await vote.findAll({
        include: [
          {
            model: post,
  
          },
        ],
        //  limit:1, // YOU CAN LIMIT
      });
      console.log(data.post_id);
  
      res.send({ data });
    } catch (error) {
      console.log("Error", error);
      return res.status(302).send({
        message: "could not get vote",
      });
    }
  };

  //Retrieve   with user and post
exports.getvotpostuser = async (req, res, next) => {
    try {
      const data = await vote.findAll({
        include: [
          {
            model: post,
  
            include: [
              {
                model: user,
  
                attributes: ["user_id", "name"],
              },
            ],
          },
        ],
        //  limit:1, // YOU CAN LIMIT
      });  
      res.send({ data });
    } catch (error) {
      console.log("Error", error);
      return res.status(302).send({
        message: "could not get vote",
      });
    }
  };

 //Get Vote by specific id
exports.get = async (req, res, next) => {
  try {
    const vote_id = req.params.id;
    const data = await vote.findOne({
      where: { vote_id: vote_id, deletedAt: null },
    });
    console.log("id", vote_id);
    if (data !== null) {
      res.status(200).json({
        Data: data,
      });
      console.log("data", data);
    } else {
      res.status(404).json({
        message: `cannot find vote with id=${vote_id}.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(302).json({
      error: error.message,
    });
  }
};

// Retrieve a single vote with post  id
exports.getvotepost = async (req, res, next) => {
  try {
    const vote_id = req.params.id;
    const data = await vote.findOne({
      where: {
          vote_id: vote_id,
      },
    });
    if (data !== null) {
      console.log('vote post ID',data);

      const postdata = await post.findOne({
        where: { post_id: data.post_id },
      });
      if (postdata !== null) {
        console.log('post data', postdata);
        
      } else {
        res.status(404).json({
          message: "Postdata not found",
        });
      }
      const Alldata = [
        { Data: data },
        { Postdata: postdata },
      ];

      console.log(Alldata);
      res.status(200).json({
        Data:Alldata
        // Data:data
      });
    } else {
      res.status(404).json({
        message: "data not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(302).json({
      error: error.message,
    });
  }
};



// Retrieve a single vote with post and user id
exports.getvotepostuser = async (req, res, next) => {
    try {
      const vote_id = req.params.id;
      const data = await vote.findOne({
        where: {
            vote_id: vote_id,
        },
      });
      if (data !== null) {
        console.log('vote post ID',data);
  
        const postdata = await post.findOne({
          where: { post_id: data.post_id },
        });
        if (postdata !== null) {
          console.log('post data', postdata);
          
        } else {
          res.status(404).json({
            message: "Postdata not found",
          });
        }
  
        const userdata = await user.findOne({
          where: {
            user_id: postdata.user_id,
          },
        });
        if (userdata !== null) {
          console.log( "userdata",userdata);
        } else {
          res.status(404).json({
            message: "Userdata not found",
          });
        }
        const Alldata = [
          { Data: data },
          { Postdata: postdata },
          { Userdata: userdata },
        ];
  
        console.log(Alldata);
        res.status(200).json({
          Data:Alldata
          // Data:data
        });
      } else {
        res.status(404).json({
          message: "data not found",
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
    const vote_id = req.params.id;
    const data = await vote.update(req.body, {
      where: {
        vote_id: vote_id,
      },
    });
    if (data !== null) {
      res.status(200).json({
        message: `vote has been updated  Successfuly with id =${vote_id}.`,
      });
    } else {
      res.status(400).json({
        message: `vote connot be updated with id=${vote_id}.`,
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
    const vote_id = req.params.id;
    console.log(req.body);
    const data = await vote.destroy({
      where: {
        vote_id: vote_id,
      },
    });
    if (data !== null) {
      res.status(200).json({
        message: `vote has been deleted Successfuly with id =${vote_id}.`,
      });
    } else {
      res.status(400).json({
        message: `vote connot be deleted with id=${vote_id}.`,
      });
    }
  } catch (error) {
    res.status(505).json({
      error: error.message,
    });
  }
};

  