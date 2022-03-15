const express = require('express');
const experience = require('../models/experience');



//create A new experience and save in database
exports.createexperience = async(req, res, next) =>{
    try{
        if(!req.body) {
        res.status(302).send({
            message: "content can not be empty!",
        });
        return;
    }
    //Create a new profile
    const exp = {
        from:req.body.from,
        to: req.body.to,
        current: req.body.current,
        profile_id: req.body.profile_id,
    };
 // Save experience in database
  const dt = await experience.create(exp);
  return res.send({data: dt});
} catch (error) {
    console.log ("error!" , error);
    res.status(500).send({
        message:  
        error.message||"some Error occure while creating experience"
    });
}
};


//Retrieve  all experience 
exports.getexperience = async (req, res , next) =>{
    try {
        const data = await experience.findAll({

        });
        res.send({data});
    }
    catch (error) {
        console.log("Error",error);
        return res.status(302).send({
            message: "could not get experience"
        });
    }
};

//Get experience by specific id
exports.get = async (req, res, next) => {
    try {
      const experience_id = req.params.id;
      const data = await experience.findOne({
        where: { experience_id: experience_id, deletedAt: null },
      });
      console.log("id", experience_id);
      if (data !== null) {
        res.status(200).json({
          Data: data,
        });
        console.log("data", data);
      } else {
        res.status(404).json({
          message: `cannot find experience with id=${experience_id}.`,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(302).json({
        error: error.message,
      });
    }
  };

  //Update experience by id
exports.update = async (req, res, next) => {
    try {
      const experience_id = req.params.id;
      const data = await experience.update(req.body, {
        where: {
            experience_id: experience_id,
        },
      });
      if (data !== null) {
        res.status(200).json({
          message: `experience has been updated with id =${experience_id}.`,
        });
      } else {
        res.status(400).json({
          message: `experience connot be updated with id=${experience_id}.`,
        });
      }
    } catch (error) {
      res.status(505).json({
        error: error.message,
      });
    }
  };
  
  //Delete experience by id
exports.delete = async (req, res, next) => {
    try {
      const experience_id = req.params.id;
      console.log(req.body);
      const data = await experience.destroy({
        where: {
            experience_id: experience_id,
        },
      });
      if (data !== null) {
        res.status(200).json({
          message: `experience has been deleted with id =${experience_id}.`,
        });
      } else {
        res.status(400).json({
          message: `experience connot be deleted with id=${experience_id}.`,
        });
      }
    } catch (error) {
      res.status(505).json({
        error: error.message,
      });
    }
  };
  