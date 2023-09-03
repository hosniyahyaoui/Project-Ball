const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    
email : String,
password : String,
avatar:String,


EnrolledClass : {
  type:mongoose.Schema.Types.ObjectId,
  ref:'Class'
},

team:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Team'
}
}, {
    timestamps: true
  });
  



module.exports=mongoose.model('Student',StudentSchema)
