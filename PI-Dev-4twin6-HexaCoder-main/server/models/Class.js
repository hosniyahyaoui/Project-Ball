const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
ClassName : String,


membres : [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Student'
}]
}, {
    timestamps: true
  });
  

module.exports=mongoose.model('Class',ClassSchema)