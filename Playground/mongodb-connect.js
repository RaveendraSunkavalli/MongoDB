const MongoClient=require("mongodb").MongoClient;



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("unable to connect to MongoDB server");
    }
    console.log('Connected to MongoDB server');
    const myDB=db.db("Todos");
    myDB.collection("Todos").insertOne({
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