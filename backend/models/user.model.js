const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        requierd:true,
        minlength:[3,'Username Must be at least 3 character long'],
        unique:true,
        lowercase:true
    },
    email:{
        type:String,
        trim:true,
        requierd:true,
        minlength:[13,'Username Must be at least 13 character long'],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        trim:true,
        requierd:true,
        minlength:[8,'Username Must be at least 8 character long']
    }
})

const user = mongoose.model("user",userSchema);

module.exports = user