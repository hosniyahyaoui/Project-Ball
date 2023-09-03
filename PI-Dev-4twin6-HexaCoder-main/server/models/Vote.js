const mongoose = require('mongoose');

const VoteShcema = new mongoose.Schema(
    {
    transactions:Array,
   nonce:Number,
   timestamp:Date,
   previousHash:String,
   hash:String

}, {
    timestamps: true
  });

  module.exports=mongoose.model('Vote',VoteShcema);