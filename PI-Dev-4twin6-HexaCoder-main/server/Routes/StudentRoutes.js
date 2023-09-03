const express = require('express');
const router = express.Router();
var url = "mongodb+srv://ahmed:ahmed@cluster0.iaanx.mongodb.net/BackendServer?retryWrites=true&w=majority";
// Student model
var mongoose= require('mongoose');
const Students = require('../models/Student');
const { route } = require('./VotesOperations');

// @route   GET /api/students/
// @desc    Get all students
// @access  Public
router.get('/', async (req, res) => {
  try {
       res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    const students = await Students.find({});
    res.send({students})
  } catch(err) {
    res.status(400).send({ error: err });
  }
});
router.get('/class', async (req, res) => {


    try {
      
      let studentsLi = [{
        classN: '',
        studen :[
          {
            fname : ''
          }
        ]
      }]
      
      
      const classes = await ClassSchema.find({});
      res.send({classes});
     
  
  /*
      classes.forEach(x => {
        Students.find({EnrolledClass : x._id}).then(studens =>(studens.map(p=>{
       //   studentsLi.push({studen:[{fname : p.fname}]})
      //   l.concat(p)
      console.log(p);
   //   studentsLi.push({classN:x.ClassName,studen:[{fname : p.fname}]})
  
        })))
  
       // studentsLi.push({classN : x._id ,studen : [{fname:"kk"} , {fname : "ssd"}]})
  
    //    console.log({fname});
       // console.log(item);
  
      //  studentsLi.push({clasN : x._id ,studen : [{fname:}]})
   //     studentsLi.studen.push({})
      })
  
      console.log(studentsLi);
      classes.forEach(Element =>{
        
        id = Element._id
        Students.find({EnrolledClass : id}).then(studens =>(studentsLi.push({classN : Element._id,students : studens})))
  
  
       
        
       //  studentsLi.classN.push({id})
      // studentsLi.student.push(Students.find({EnrolledClass:id}))
  
      })
      */
   //   res.send({array});
  /*
      students.forEach(Element =>{
        studentsLi.class = Element.EnrolledClass
        studentsLi.student.push({_id : Element._id,fname:Element.fname})
        
       // console.log(Element.password);
      })
      console.log(studentsLi);
      console.log(studentsLi.class);*/
  
    } catch(err) {
      res.status(400).send({ error: err });
    }
  });
// @route   GET /api/students/:id
// @desc    Get a specific student
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const student = await Students.findById(req.params.id);
    res.send({ student });
  } catch (err) {
    res.status(404).send({ message: 'Student not found!' });
  }
});
router.post('/', async (req, res) => {
  try {

    const newStudent = await Students.create({ fname: req.body.fname, lname:req.body.lname, email: req.body.email,password : req.body.password, avatar: req.body.avatar,EnrolledClass:req.body.EnrolledClass , team:req.body.team,
         });
     res.send({ newStudent });
  } catch(err) {
    res.status(400).send({ error: err });
  }

});

// @route   PUT /api/students/:id
// @desc    Update a student
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Students.findByIdAndUpdate(req.params.id, req.body);
     res.send(updatedStudent);
  } catch(err) {
    res.status(400).send({ error: err });
  }
});

// @route   DELETE /api/students/:id
// @desc    Delete a student
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const removeStudent = await Students.findByIdAndRemove(req.params.id);
     res.send({ message: 'The student was removed' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
}); 
router.get('/loginstudent/:email/:password',(req,res)=>{
  Students.find({email:req.params.email,password:req.params.password},(err,docs)=>{
    if(err) res.send(err)
    else res.send(docs)
  })
})
module.exports = router;