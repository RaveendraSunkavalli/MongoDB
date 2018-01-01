var mongoose=require('mongoose');
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://Ravi:root@ds237967.mlab.com:37967/ravindranodepractice' || 'mongodb://localhost:27017/TodoApp').then(()=>{
    console.log("connected to mongodb");
},(err)=>{
    console.log(err);
});
module.exports={
    mongoose,
}