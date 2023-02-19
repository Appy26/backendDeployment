const express = require('express');
const jwt = require('jsonwebtoken');

const authenticate=(req,res,next)=>{
const token=req.headers.authorization
try {
    jwt.verify(token,"library",function(err,decoded){
        console.log(decoded);
        req.body.author=decoded.user
        if(decoded){
            next()
        }else{
            res.send({"msg":"Please Login"})
        }
    })
} catch (error) {
   res.send({"msg":"wrong authentication token please verify it"}) 
}
}

module.exports={authenticate}