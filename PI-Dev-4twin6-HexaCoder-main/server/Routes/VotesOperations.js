const express=require('express');
//var http= import(this)
var url2="mongodb+srv://ahmed:ahmed@cluster0.iaanx.mongodb.net/BackendServer?retryWrites=true&w=majority"
const Route = express.Router();
const voteblock= require("../Models/Vote");
const Projects=require("../Models/Project");
var mongoose= require('mongoose');
const SHA256=require('crypto-js/sha256')
var cors=require('cors');
const mongo = require('mongo');
Route.use(cors(origin="http://localhost:3000"))
var admin = require("firebase-admin");
const { initializeApp } = require('firebase-admin/app');
// Fetch the service account key JSON file contents
var serviceAccount = require("./projecttryout-6b99f-firebase-adminsdk-1hfoy-db64bfcf27.json");
const { MD5 } = require('crypto-js');
const { Alert } = require('react-native-web');
const md5 = require('md5');
/*admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // The database URL depends on the location of the database
    databaseURL: "https://projecttryout-6b99f-default-rtdb.firebaseio.com"
  });
  
  // As an admin, the app has access to read and write all data, regardless of Security Rules
  var db = admin.database();
  var PollsRef=db.ref("polls");
  console.log(db)*/
class Block{
    constructor(transactions,timestamp,previousHash="",hash="")
    {
      
      this.timestamp=timestamp,
      this.transactions=transactions,
      this.previousHash=previousHash,
      this.nonce=0,
      this.hash=this.calculateHash()
    }
    calculateHash()
    {
        return SHA256(this.previousHash+this.timestamp+this.transactions+this.nonce).toString();
    }
    getprevioushash()
    {
        return this.previousHash
    }
    mineblock()
    {

       while(String(this.hash).substring(0,1) !== Array(1 + 1).join("0"))
       {
            this.nonce++;
            this.hash=this.calculateHash()
       }
       return this.hash
    }
    gethash()
    {
      return this.hash
    }
    }
/**db.votechains.aggregate( 
 * {$group : { _id : { month : {$month : "$timestamp"},
 *  year : {$year :  "$timestamp"}, day :{$dayOfMonth:"$timestamp"}},
 *   total : {$sum :1} }})**/
/**db.votechains.aggregate({$group:{_id:{$arrayElemAt: [ "$transactions", 1 ]},total:{$sum:1}}})**/
Route.get('/stats1',async(req,res)=>{
 
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    await voteblock.aggregate([{$group : { _id : { month : {$month : "$timestamp"},
     year : {$year :  "$timestamp"}, day :{$dayOfMonth:"$timestamp"}},
      total : {$sum :1} }}, { $project: { _id: 1, total: 1 }}],function (err, docs1) {
        if(err){res.send("Error")}
        else res.send(docs1)
      }).sort({"_id":-1})

})
Route.get('/get',(req,res)=>{
 
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
     Projects.aggregate([{$lookup: {
      from: "teams",
      localField: "team",
      foreignField: "_id",
      as: "Team"
   }}],function(err,docs){
      if(err)
      res.send(err)
      else 
      res.send(docs)
    })

})
Route.get('/stats2',async(req,res)=>{
 
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
   voteblock.aggregate([{$group:{_id:{$arrayElemAt: [ "$transactions", 1 ]},total:{$sum:1}}}],function (err, docs1) {
        if(err){res.send("Error")}
        else res.send(docs1)
      }).sort({"total":-1})

})

Route.get('/stats3',async(req,res)=>{
 
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  Projects.aggregate( [ {$group : { _id :{option:"$project_option",qualified:"$state_qualified"},  nb_qualified_project : {$sum :1} }}]
  ).match({ "_id.qualified" : true }).sort({"nb_qualified_project":-1}).exec((err,docs)=>{
    if (err) {
        console.log(err);
       
        res.send(err);
      } else {
        res.send(docs);
      }
  })

})
Route.get('/stats4/:option',async(req,res)=>{

 
  var option=req.params.option;
  voteblock.aggregate([({ $group: { _id:{$arrayElemAt:["$transactions",1]},count:{$sum:1}}})]
  ).match({ "_id.project_option" : option }).project({"_id.project_option":1,"_id.team.team_Name":1,count:1}).exec((err,docs)=> {
    if (err) {
      console.log(err);
     
      res.send(err);
    } else {
      res.send(docs);
    }
  });

})
Route.post('/addvotes',async(req,res)=>{
   
      let block1=new Block();
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      voteblock.find({},function (err, docs1) {
       let block=docs1[docs1.length-1];
      // console.log("transaction.0="+block.transactions[0])
       const x = docs1.filter(x=>x.transactions[0]==req.body.transactions[0])''
       console.log("result=>"+x)
        if((docs1.length==0))
        {
          res.header("Access-Control-Allow-Origin", "http://localhost:3000");
            voteblock.create({
  
                transactions:req.body.transactions,
                timestamp:Date.now(),
                hash:0
                })
        }
        else if(x.length==0){         
            block1.previousHash=block.hash
            block1.hash=block1.mineblock()
            console.log("new block:")
            console.log(block1)
            res.header("Access-Control-Allow-Origin", "http://localhost:3000");
           
            voteblock.create({
          
          transactions:req.body.transactions,
          timestamp:Date.now(),
          previousHash:block.hash,
                  hash:block1.hash
          }).then((ans) => {
          console.log("Document inserted")
         // res.send("added");
          }).catch((err) => {
          console.log(err.Message);
          })
              if(err)
              console.log(err)
            
        }
       
    /*  else {
        PollsRef.push().set({
          transactions:req.body.transactions,
          timestamp:Date(Date.now()).toString(),
          previousHash:block.hash,
                  hash:block1.hash
         )};}*/
      console.log("new Block=>"+block)
        res.send(block)
       } )          
})

Route.get('/isblockchainvalid',(req,res)=>{
  voteblock.find({},(err,docs)=>{
    if(err) res.send(err)
    else 
    {
      let counter=1;
      for(let i=0;i<docs.length-1;i++)
      {
            if(docs[i].hash==docs[i+1].previousHash)
            {
              counter=counter+1  
            }
            else {
              res.send("this is not a valid blockchain")
            }
      }
      if(counter==docs.length)
       {res.send(docs)}
    }
  })
})

module.exports=Route
   
