const express=require('express');
var url = "mongodb+srv://ahmed:ahmed@cluster0.iaanx.mongodb.net/BackendServer?retryWrites=true&w=majority";
const Route = express.Router();
const voteblock= require("../Models/Vote")
const teacher=require('../Models/Teacher')
const Projects=require("../Models/Project");
const Student = require("../models/Student")
const Class = require("../models/Class")
const Teams=require('../Models/Team')
var mongoose= require('mongoose');
const cors= require('cors')
Route.use(cors())
Route.post("/addTeam",async(req,res)=>{
  

        const newTeam = await Teams.create({team_Name:req.body.team_Name,membres:req.body.membres});
         res.send( newTeam );
    
})
Route.get('/getTeams',async(req,res)=>{
    try {

        const teams = await Teams.find({});
        res.send({teams})
      } catch(err) {
        res.status(400).send({ error: err });
      }
     
})
Route.get('/class/:id',async (req,res)=>{
    
        const Team = await Teams.findById(req.params.id);
        const membres = Team.membres;
     //   console.log(membres);
//console.log(membres.slice(0, 1).shift());

   //     const Student = await StudentSchema.findById();
    const student = await Student.findById(membres.slice(0, 1).shift());
     //   clas = student.EnrolledClass
//console.log(student);
        const classN = await Class.findById(student.EnrolledClass);
        res.send({classN});
  
});
Route.get('/students/:id',async(req,res)=>
{
    
             s = []
            const Team = await Teams.findById(req.params.id);
         // res.send(Team.membres);
          for (let index = 0; index <  Object.keys(Team.membres).length; index++) {
            const element = await Student.findById(Team.membres[index]);
            console.log(element);
            s.push(element)
          }
          json = { ...s };



          res.send(s)
  
})
Route.delete('/deleteTeam/:id',async(req,res)=>{
  
      await Teams.findByIdAndRemove(req.params.id);
     res.send({ message: 'The Team was removed' });
     
})


module.exports=Route