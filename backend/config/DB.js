const mongoose = require("mongoose")

function ConnectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("DB connected successfully")
    })
}

module.exports = ConnectToDB;