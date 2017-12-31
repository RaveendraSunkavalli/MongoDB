const {
    mongoose
} = require('../Server/db/mongoose');
const {
    Todo
} = require('../Server/Models/Todos');
const {
    User
} = require('../Server/Models/Users');
const {
    ObjectID
} = require('mongodb');
var id = "5a4925c84670da1f48d0abb5";
var userid="5a49241391e674052ce3edc1";
if (!ObjectID.isValid(id)) {
    console.log("ID not a Valid");
}

Todo.find({
    _id: id
}).then((doc) => {
    if (!doc) {
        return "id not found"
    }
    console.log('Todos', doc);
});

Todo.findOne({
    _id: id
}).then(doc => {
    if (!doc) {
        return "id not found"
    }
    console.log("todo:", doc);
});

Todo.findById(id).then(doc => {
    if (!doc) {
        console.log("id not found");
    } else
        console.log("todoById:", doc);
}, err => {
    console.log(err);
});
if (!ObjectID.isValid(userid)) {
    console.log("ID not a Valid");
}
User.findById(userid).then(doc=>{
    if(!doc)
        console.log("Id not Found");
    else
        console.log("user:",doc)
});

User.find({_id:userid}).then(doc=>{
    if(!doc)
        console.log("Id not Found");
    else
        console.log("user:",doc)
});

User.findOne({_id:userid}).then(doc=>{
    if(!doc)
        console.log("Id not Found");
    else
        console.log("user:",doc)
});


User.findById(userid).then(doc=>{
    if(!doc)
        console.log("Id not Found");
    else
        console.log("user:",doc)
});