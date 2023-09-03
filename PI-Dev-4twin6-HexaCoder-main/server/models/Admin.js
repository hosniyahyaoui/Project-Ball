const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
email : String,
password : String,
avatar:String,


})
module.exports=mongoose.model('Admin',AdminSchema)