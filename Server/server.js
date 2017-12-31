
const express=require('express');
const bodyParser=require("body-parser")

var {mongoose}=require("./db/mongoose");
var {Todo}=require('./Models/Todos');
var {User}=require('./Models/Users');
var app=express();
app.use(bodyParser.json());
app.post('/todos',(req,res)=>{
    var todo=new Todo({
        text:req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);

    });
});

app.post('/user',(req,res)=>{
    
    var usr=new User({
        email:req.body.email
    });
    usr.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});
app.get('/todos',(req,res)=>{
    Todo.find().then((doc)=>{
        res.send(doc);
    },err=>{
        res.status(400).send(err);
    });
});


app.listen(3000,()=>{
    console.log("connected to localhost");
});
 module.exports={app};

