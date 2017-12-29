const {MongoClient,ObjectID}=require("mongodb");

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("unable to connect to MongoDB server");
    }
    console.log('Connected to MongoDB server');
    const myDB=db.db("Todos");
    // myDB.collection('Todos').deleteMany({text:'Walk the dog'}).then((res)=>{
    //     console.log(res);
    // },(err)=>{
    //     console.log(err);
    // });
    // myDB.collection('Todos').deleteOne({text:'Walk the dog'}).then((res)=>{
    //     console.log(res);
    // },(err)=>{
    //     console.log(err);
    // });
    myDB.collection('Todos').findOneAndDelete({_id: new ObjectID("5a45e0cdb512a00da0fdaf9e")}).then((res)=>{
        console.log(res);
    },(err)=>{
        console.log(err);
    });
    db.close();
});