const mongoose = require('mongoose');
const Project = require('./Project');

const ThemeSchema = new mongoose.Schema({
    
Theme:{type:String, unique:true},


projects:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Project'
}]
})
module.exports=mongoose.model('Theme',ThemeSchema)