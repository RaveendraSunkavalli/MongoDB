const mongoose=require('mongoose');


mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');
var Todo=mongoose.model('Todo',{
    text:{
        type:String,
    },
    completed:{
        type:Boolean,
    },
    completedAt:{
        type:Number
    }
});

var newTodo=new Todo({
    text:"Eating",
    completed:true,
    completedAt:20
});

newTodo.save().then((res)=>{
    console.log(res);
},(err)=>{
    console.log(err);
});