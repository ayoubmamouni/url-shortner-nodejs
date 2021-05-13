const mongoose = require('mongoose')

//generate random letters
const shortSchema = new mongoose.Schema({
    showInPublicLinks:{
        type: Boolean,
        required: true,
        default: true,
    },
    fullURL : {
        type:String,
        required: true,
    },
    shortURL:{
        type: String,
        required: true,
    },
    views:{
        type: Number,
        required: true,
        default: 0,
    }
    ,
    postedOn:{
        type: Date,
        default: new Date(),
    }
})

module.exports = mongoose.model('ShortUrl', shortSchema)