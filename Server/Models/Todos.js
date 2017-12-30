var mongoose=require("mongoose");

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: true
    },
    completedAt: {
        type: Number,
        default: 0
    }
});

var newTodo = new Todo({
    text: "Something to do"

});

newTodo.save().then((res) => {
    console.log(res);
}, (err) => {
    console.log(err);
});

module.exports={
    Todo,
}