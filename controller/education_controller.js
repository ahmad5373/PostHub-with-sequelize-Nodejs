const express = require('express');
const education = require('../models/education');


// Create and save new education in database 
exports.createeducation = async(req, res, next) =>{
    try{
        if (!req.body) {
            res.status(302).send({
                message : "content can not be empty!",
            });
            return;
        }
        // Create education
        const edu = {
            from:req.body.from,
            to: req.body.to,
            degree: req.body.degree,
            profile_id: req.body.profile_id,
        };

        // save education in database
         const dt = await education.create(edu);
         return res.send({data: dt});
    } catch (error) {
        console.log ("Error!", error);
        return res.status(500).send({
            message:
            error.message ||"some Error occure while creating education."
        });
    }
};

//Get all education 
exports.geteducation = async(req , res , next)=>{
    try{
      const data = await education.findAll({
  
      });
      res.send({data});
    }catch (error){
      console.log('error',error);
      return res.status(302).send({
        message: "could not get education"
      });
    }
  };

  //Get education by specific id
  exports.get = async(req , res, next)=>{
    try{
      const education_id = req.params.id;
      const data = await education.findOne({
        where: { education_id: education_id , deletedAt:null},
        
      });
    console.log('id',education_id);
     if(data!==null){
      res.status(200).json({
  
       Data:data
      });
      console.log('data',data);
    }else {
      res.status(404).json({
        message: `cannot find education with id=${education_id}.`,
      });
    }
  }
    catch (error) {
      console.log(error);
      return res.status(302).json({
        error: error.message,
      });
    }
    };
  
    //Update education by id
exports.update = async (req, res, next) => {
    try {
      const education_id = req.params.id;
      const data = await education.update(req.body, {
        where: {
            education_id: education_id,
        },
      });
      if (data !== null) {
        res.status(200).json({
          message: `education has been updated with id =${education_id}.`,
        });
      } else {
        res.status(400).json({
          message: `education connot be updated with id=${education_id}.`,
        });
      }
    } catch (error) {
      res.status(505).json({
        error: error.message,
      });
    }
  };
  
  //Delete education by id
exports.delete = async (req, res, next) => {
    try {
      const education_id = req.params.id;
      console.log(req.body);
      const data = await education.destroy({
        where: {
            education_id: education_id,
        },
      });
      if (data !== null) {
        res.status(200).json({
          message: `education has been deleted with id =${education_id}.`,
        });
      } else {
        res.status(400).json({
          message: `education connot be deleted with id=${education_id}.`,
        });
      }
    } catch (error) {
      res.status(505).json({
        error: error.message,
      });
    }
  };
  