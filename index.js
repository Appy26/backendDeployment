const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config()
const{connection}=require("./config/db")
const {userRoute}=require("./Routes/user.routes")
const{bookRoute}=require("./Routes/books.router")
const{authenticate}=require("./middlewares/token")
const cors = require('cors');
const app=express()
app.use(cors())
app.use(express.json())
app.use("/user",userRoute)
app.use(authenticate)
app.use("/library",bookRoute)


app.listen(process.env.port,async()=>{
    try{
await connection
console.log("connected to db")

    }catch(err){
console.log(err)
    }
console.log("server is running at port at 3600");
})