const {MongoClient,ObjectID}=require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("unable to connect to MongoDB server");
    }
    console.log('Connected to MongoDB server');
    const myDB=db.db("Todos");
    myDB.collection("Todos").find().toArray().then((docs)=>{
         console.log("Todos");
        console.log(JSON.stringify(docs,"",4));
   },(err)=>{
        console.log(err);
    });
    myDB.collection("Todos").find({completed:false}).toArray().then((docs)=>{
        console.log("Todos");
        console.log(JSON.stringify(docs,"",4));
    },(err)=>{
        console.log(err);
    });

    myDB.collection("Todos").find({
        _id:new ObjectID('5a44ed5320823811800eacd0'),
    }
    ).toArray().then((docs)=>{
        console.log("Todos");
        console.log(JSON.stringify(docs,"",4));
    },(err)=>{
        console.log(err);
    });
    db.close();
});









    