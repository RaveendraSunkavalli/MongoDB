const {SHA256}=require('crypto-js');
const jwt= require("jsonwebtoken");
var bcrypt = require('bcryptjs');


var password='abc123';
var hashPassword="";
bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,(err,hash)=>{
       console.log(hash);
    });
});
var hashPassword='$2a$10$T0NsDsuDVsxgu/Qb.tYU5eT5nwBRYYJldHmBt4v/TGZieaPKGPvxC';
bcrypt.compare(password,hashPassword,(err,res)=>{
    console.log(res);
})
// var data={
//     id:10
// }
// var token=jwt.sign(data,'abc123');
// console.log(token);
// var decoded=jwt.verify(token,'abc123');
// console.log(decoded);


// var msg="hello world";

// console.log(msg);
// console.log(SHA256(msg).toString());


// var data={
//     id:4
// } 
// var token={
//     data,
//     hash: SHA256(JSON.stringify(data)+"some secret").toString()
// }

// var resultHash=SHA256(JSON.stringify(token.data)+"some secret").toString();

// if(resultHash===token.hash){
//     console.log("Not changed");
// }
// else
//     console.log("changed");