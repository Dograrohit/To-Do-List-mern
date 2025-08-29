const express = require("express")
const cors = require('cors')
const ConnectToDB = require("./config/DB")
const dotenv = require("dotenv")
const userRouter = require("./routes/user.routes")
const homeRouter = require("./routes/home.routes")

dotenv.config()
ConnectToDB()

const cookie = require("cookie-parser")

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: "https://to-do-list-frontend-cv25.onrender.com", 
  credentials: true
}))
app.use(cookie())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user',userRouter)
app.use("/Home",homeRouter)



app.listen(PORT,()=>{
    console.log("server is running in port 5000")
})