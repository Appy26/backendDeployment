const express = require('express');
const userRoute=express.Router()
const {userModel}=require('../models/user.model')

const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")



userRoute.post("/register",async(req,res)=>{
    const{email,pass}=req.body
    try {
      // check if user is present
      const isUserPresetn = await userModel.findOne({email});
      console.log(isUserPresetn)
      if(isUserPresetn) return res.send("PLease login")
      const hash = await  bcrypt.hashSync(pass,5)
       console.log(hash) 
      const newUser =  new userModel({email,pass:hash});
      await newUser.save()
      res.send({"msg":"user registered"})
    } catch (error) {
       res.send(error.message) 
    }
   
})
userRoute.post("/login",async(req,res)=>{
    const {email,pass}=req.body
  try {
    const user=await userModel.find({email})
    if(user.length>0){
        bcrypt.compare(pass, user[0].pass, function(err, result) {
           if(result){
            let token = jwt.sign({user: user[0]._id }, 'library',{expiresIn:"1h"});
            res.send({"msg":"login successful","token":token})
           }
           else{
            res.send("Wrong Password")
           }
        })
    }
    else
    {
        res.send("wrong email")
    }
  } catch (error) {
    res.send(error.message) 
  }
})

module.exports={userRoute}