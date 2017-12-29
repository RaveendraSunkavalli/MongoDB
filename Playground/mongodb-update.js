const {MongoClient,ObjectID}=require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("unable to connect to MongoDB server");
    }
    console.log('Connected to MongoDB server');
    const myDB=db.db("Todos");
    myDB.collection('Todos').findOneAndUpdate({"_id" :new  ObjectID("5a45e2307b942803485d6db0")},
       { $set: {completed:true} },
      // {returnOrginal:false}
    ).then((res)=>{
        console.log(res);
    },(err)=>{
        console.log(err);
    });


db.close();
});