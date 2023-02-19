const express = require('express');
const {bookModel}=require("../models/book.model")
const jwt=require("jsonwebtoken")
const bookRoute=express.Router()

bookRoute.get("/books",async(req,res)=>{
  try {
   const books=await bookModel.find()
   res.send(books)
  } catch (error) {
   res.send({"msg":"error.message"})
  }

})

bookRoute.post("/add",(req,res)=>{
   try {
    const book = req.body
    const add=new bookModel(book)
    add.save()
    res.send({"msg":"added"})
   } catch (error) {
    res.send({"msg":error.message})
   }
})

bookRoute.patch("/update/:id",async(req,res)=>{
   const Id=req.params.id
   const payload=req.body
   try {
    await bookModel.findByIdAndUpdate({_id:Id},payload)
    res.send({"msg":"Successfully updated"})
   } catch (error) {
    res.send({"msg":error.message})
   }
})

bookRoute.delete("/delete/:id",async(req,res)=>{
    const Id=req.params.id
    try {
        await bookModel.findByIdAndDelete({_id:Id})
        res.send({"msg":"Successfully deleted"})
       } catch (error) {
        res.send({"msg":error.message})
       }
})

module.exports={bookRoute}