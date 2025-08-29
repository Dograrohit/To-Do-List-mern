const mongoose = require("mongoose")

const List = new mongoose.Schema({
      user:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"users",
          required:[true,"user is required"]
      },
       massage:{
        type:String,
        required:[true,"message is required"]
       },
       check:{
        type:Boolean,
        default:false
       }
})

const list = mongoose.model("List",List)

module.exports = list