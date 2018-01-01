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
var id = "5a4a5c9f08c5db148c01155f";


// Todo.remove({_id:id}).then((doc)=>{
//     console.log(doc);
// });

// Todo.findOneAndRemove({_id:id}).then((doc)=>{
//     console.log(doc);
// });

Todo.findByIdAndRemove("5a4a5c9f08c5db148c01155f").then((doc) => {
    console.log(doc);
});