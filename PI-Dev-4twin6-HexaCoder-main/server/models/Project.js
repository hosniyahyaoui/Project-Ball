const mongoose = require('mongoose');
const Teacher = require('./Teacher');
const projectSchema = new mongoose.Schema({
project_name:String,
project_option:Sting,
project_link:String,
date_of_creation:Date,
logo:String,
Marketing:String,       
description:String,




// One to Many [Project To Teacher]
teacher:{
    type:mongoose.Schema.type.ObjectId,
    ref:'Teacher'
},

// One To One [Project to Team ]
team: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Team' 
  },
theme:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Theme'
}

}, {
  timestamps: true
});
module.exports=mongoose.model('Project',projectSchema)
