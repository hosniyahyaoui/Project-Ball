const mongoose = require('mongoose');
const TeamSchema = new mongoose.Schema({

team_Name:String,


// One To Many [Team to Student]
membre:[
    {
        type:mongoose.Schema.Types.ObjectId,ref:'Student'
    },
],


// One To One [Team To Project]
project:{
    type:mongoose.Schema.Types.ObjectId,ref:'Project'
}
}, {
    timestamps: true
  });
  



module.exports=mongoose.model('Team',TeamSchema)

