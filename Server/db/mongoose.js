const mongoose=require('mongoose');
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp').then(()=>{
    console.log("connected to mongodb");
},(err)=>{
    console.log(err);
});
module.exports={
    mongoose,
}