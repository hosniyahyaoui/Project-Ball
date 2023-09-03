const express = require('express');
const router = express.Router();

const ClassSchema = require('../models/Class');



//get Class 
router.get('/',async (req,res)=>
{
    try {
        const classes = await ClassSchema.find({});
        res.send({classes})
    }
    catch(err) {
        res.status(400).send({ error: err });
      }
})
router.get('/:id', async (req, res) => {
  try {
    const classe = await ClassSchema.findById(req.params.id);
    res.send({ classe });
  } catch (err) {
    res.status(404).send({ message: 'Class not found!' });
  }
});

//Add Class
router.post('/', async (req, res) => {
    try {
      const newClass = await ClassSchema.create({ ClassName : req.body.ClassName });
       res.send({ newClass });
    } catch(err) {
      res.status(400).send({ error: err });
    }
  
  });
  
 module.exports =router