const express=require('express');
var url = "mongodb+srv://ahmed:ahmed@cluster0.iaanx.mongodb.net/BackendServer?retryWrites=true&w=majority";
const Route = express.Router();
const voteblock= require("../Models/Vote")
const teacher=require('../Models/Teacher')
const Projects=require("../Models/Project");
const Students = require('../models/Student');
const Team = require("../Models/Team")
var mongoose= require('mongoose');
const cors= require('cors')
var nodemailer = require('nodemailer');
const router = require('./StudentRoutes');

Route.use(cors())
Route.post('/addproject',(req,res)=>{
         res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      Projects.create({
        project_name:req.body.project_name,
        project_theme:req.body.project_theme,
        project_option:req.body.project_option,
        project_link:req.body.project_link,
        team:req.body.team,
        date_of_creation:Date(req.body.project_theme),
        state_qualified:false,
        teacher:req.body.teacher,
        logo:req.body.logo,
        Marketing:req.body.Marketing,      
        description:req.body.description
         
      }).then(ans=>{res.send("Added")}).catch(err=>{res.send(err)})
})
Route.delete('/deleteproject/:id',(req,res)=>{
   
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      Projects.find({_id:req.params.id},(err,docs)=>{
        if(err) res.send(err)
        else {
          if(docs[0].state_qualified==true)
          {
            res.send("you cannot delete a qualified project")
            
          }
          else
          {
            Projects.find({_id:req.params.id}).remove().then(ans=>{res.send("deleted")}).catch(err=>{res.send("Error")}) 
      
          }
        }

 
      })
      
      
})
Route.put('/qualifyproject/:id',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
   
     
      var options = { multi: false }
      res.header("Access-Control-Allow-Origin", "http://localhost:3000")
      Projects.updateOne(
          { _id: req.params.id }
          ,{$set:{ state_qualified:true}}
          , options,
          function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Original Doc : ",docs);
            console.log("Document Updated")
            res.send(200);
        }
    })
})
Route.put('/editproject',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
     
       
        var options = { multi: false }
        res.header("Access-Control-Allow-Origin", "http://localhost:3000")
        Projects.updateOne(
            { _id: req.body._id }
            ,{$set:{ 
                project_name:req.body.project_name,
        project_theme:req.body.project_theme,
        project_option:req.body.project_option,
        project_link:req.body.project_link,
        team:req.body.team,
        date_of_creation:Date(req.body.project_theme),
        teacher:req.body.teacher,
        logo:req.body.logo,
        Marketing:req.body.Marketing,      
        description:req.body.description
            }}
            , options,
            function (err, docs) {
          if (err){
              console.log(err)
          }
          else{
              console.log("Original Doc : ",docs);
              console.log("Document Updated")
              res.send(200);
          }
      })
  })
Route.get('/getnonaffectedTeams',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  Team.aggregate([{$lookup: {
   from: "projects",
   localField: "_id",
   foreignField: "team",
   as: "Project"
}}],function(err,docs){
   if(err)
   res.send(err)
   else 
   {
     z=docs.filter(x=>x.Project.length==0)
   res.send(z)
   }
 }) 
})
Route.get('/findAll',(req,res)=>{
  
    
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  Projects.aggregate([{$lookup: {
   from: "teams",
   localField: "team",
   foreignField: "_id",
   as: "Team"
}}],function(err,docs){
   if(err)
   res.send(err)
   else 
   res.send(docs)
   
 })
})
Route.put('/GetProjectByStudent/:id/:vid',(req,res)=>{
 
 res.header("Access-Control-Allow-Origin", "*");
 
 Team.find({ "membres" : { $in: req.params.id } },(err,docs)=>{
  if(err) res.send(err)
  else{  
    console.log(docs)
    Projects.findOneAndUpdate({"team":docs[0]._id},{Marketing:req.params.vid},(err,docs)=>{
      if(err) res.send(err)
      else{  
        res.send(docs)
    }})
   
 //res.send(docs[0]._id)
}})
})
Route.get('/GetProject/:id',(req,res)=>{
 
  res.header("Access-Control-Allow-Origin", "*");
  
  Team.find({ "membres" : { $in: req.params.id } },(err,docs)=>{
   if(err) res.send(err)
  
    
     else{
     console.log(docs)
     if(docs.length==0)
     {
       res.send(docs)
     }
     else{
     Projects.find({"team":docs[0]._id},(err,docs)=>{
       if(err) res.send(err)
       else{  
      
        
        res.send(docs)
       
     }})}
    
  //res.send(docs[0]._id)
 }})
 })
Route.get('/getTeachers',(req,res)=>{
  
  mongoose.connect(url).then((ans) => {
      console.log("ConnectedSuccessful")
    }).catch((err) => {
      console.log("Error in the Connection")
    })
   res.header("Access-Control-Allow-Origin", "*");
    teacher.find({},function(err,docs){
        if(err)
        {
            
            res.send(err)
        }
        else 
        {
          if(docs.length==0)
          {
            res.send("")
          }
          else{
          res.send(docs)
    }}})

})


function mailing(to)
{
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'baissahmed@gmail.com',
    pass: '2XTAP@L20C1999'
  }
});

var mailOptions = {
  from: 'baissahmed@gmailcom',
  to: to,
  subject: 'Bal PROJECTS',
  text: 'congrats you project has been chosen for Bal-Project '
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
Route.get("/sendmail/:id",(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
Team.find({_id:req.params.id},(err,docs)=>{
  if(err) res.send(err)
  else{
   // res.send(docs[0].membres)
     // 
      console.log(docs[0].membres[0])
      Students.find({_id:docs[0].membres[0]},(err,docs)=>{
        if(err) res.send(err)
        else{
          if(docs.length==0){res.send("**")}
          console.log(docs)
          mailing(docs[0].email)
          res.send("sent")
        }
      })
     
  }

})
})
module.exports=Route;