const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    email:String,
    pass:String,
})
const userModel=mongoose.model("users",userSchema)

module.exports={userModel}