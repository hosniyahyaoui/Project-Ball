const mongoose = require('mongoose');

const TeacherShcema = new mongoose.Schema({
email : String,
password : String,
avatar:String,

projects: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
  ]
})
module.exports=mongoose.model('Teacher',TeacherShcema)