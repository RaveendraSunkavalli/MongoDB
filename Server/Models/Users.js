
var mongoose=require("mongoose");

var user=mongoose.model('Users',{
    email:{
        type:String,
        required:true,
        minLength:1,
        trim:true,
    }
});

var usr=new user({
    email:"s.ravi@gmail.com"
});
usr.save().then((doc)=>{
    console.log(doc);
},(err)=>{
    console.log(err);
});
module.exports={
    user,
}