const mongoose = require('mongoose');

const bookSchema=mongoose.Schema({
    name:String,
    genre:String,
    author:String
})

const bookModel=mongoose.model("Book",bookSchema)

module.exports={bookModel}