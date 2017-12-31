//const MongoClient=require("mongodb").MongoClient;
const {MongoClient}=require("mongodb");
var user={name:"Ravi",age:25};
var {name}=user;
console.log(name);



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("unable to connect to MongoDB server");
    }
    console.log('Connected to MongoDB server');
    const myDB=db.db("TodoApp");
    myDB.collection("Todo").insertOne({
        text:'Walk the dog',
         completed:false,
   },(err,res)=>{
        if(err){
            return console.log("unable to create",err);
        }
        console.log(JSON.stringify(res.ops));
   });
   myDB.collection("Users").insertOne({
        name:"Ravi",
        age:25,
        location:"Bengaluru",
    },(err,res)=>{
        if(err){
            return "Unable to insert data"+err;
        }
        console.log(JSON.stringify(res.ops,"",2));
    });
    db.close();
});