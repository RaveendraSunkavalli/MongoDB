
const config=require("./Config/config");
const _ = require('lodash');
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


var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/user',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    
    user =new User(body);
    user.save().then((user)=>{
        return user.generateAuthToken();
        
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((err)=>{
        res.status(400).send(err)
    });
});

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


app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(404).send();
    Todo.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            res.status(400).send();
        } else {
            res.send(doc);
        }
    }, err => {
        res.status(404).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id))
        return res.status(404).send();
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completedAt = null;
        body.completed = false;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo)
            return res.status(400).send();

        res.send(todo);

    }).catch((err) => {
        res.status(404).send();
    });

});





app.listen(port, () => {
    console.log("connected to", port);
});
module.exports = {
    app
};


