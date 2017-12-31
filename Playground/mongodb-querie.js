const {
    mongoose
} = require('../Server/db/mongoose');
const {
    Todo
} = require('../Server/Models/Todos');
const {
    user
} = require('../Server/Models/Users');
const {
    ObjectID
} = require('mongodb');
var id = "5a4925c84670da1f48d0abb5";
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