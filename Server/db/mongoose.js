var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
//mongodb://Ravi:root@ds237967.mlab.com:37967/ravindranodepractice' 

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("connected to mongodb");
},(err)=>{
    console.log(err);
});
module.exports={
    mongoose,
}