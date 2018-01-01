const express = require('express');
const bodyParser = require("body-parser");
const {
    ObjectID
} = require('mongodb');


var {
    mongoose
} = require("./db/mongoose");
var {
    Todo
} = require('./Models/Todos');
var {
    User
} = require('./Models/Users');
var app = express();


var port=process.env.PORT|| 3000;

app.use(bodyParser.json());
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);

    });
});

app.post('/user', (req, res) => {

    var usr = new User({
        email: req.body.email
    });
    usr.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});
app.get('/todos', (req, res) => {
    Todo.find().then((doc) => {
        res.send(doc);
    }, err => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    ObjectID.isValid(id)
    if (ObjectID.isValid(id)) {
        Todo.findById(id).then((doc) => {
            if (!doc) {
                res.status(400).send();
            } else
                res.send(doc);
        }), (err => {
            res.status(404).send(err);
        });
    } else
        res.status(404).send();
});


app.delete('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id))
        return res.status(404).send();
    Todo.findByIdAndRemove(id).then((doc)=>{
        if(!doc){
            res.status(400).send();
        }
        else{
            res.send(doc);
        }
    },err=>{
        res.status(404).send();
    });
});

app.listen(port, () => {
    console.log("connected to localhost");
});
module.exports = {
    app
};