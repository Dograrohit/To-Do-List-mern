const express = require("express")
const router = express.Router()
const { body , validationResult } = require('express-validator')
const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



router.post('/signup',

    body('email').trim().isEmail().isLength({min:8}),
    body('password').trim().isLength({min:8}),
    body('username').trim().isLength({min:5}),

    async (req,res)=>{

      const error = validationResult(req)

      if(!error.isEmpty()){
        return  res.status(400).json({
            error:error.array(),
            message:"Invalid Data !"
           })
      }
     
      try {


      const { username, email, password } = req.body;
      const hashpassword = await bcrypt.hash(password, 10);

      const newuser = await userModel.create({
        username,
        email,
        password: hashpassword,
      });
   
      let token = jwt.sign({
        Userid:newuser._id,
         email:newuser.email,
         username:newuser.username
      },process.env.JWT_SECRET,{expiresIn:"2d"})   

      res.cookie("token",token)

      res.status(200).json({message:"Signup successful",token,
        user: {
      id: newuser._id,
      username: newuser.username,
      email: newuser.email
    }
      })
      
    } catch (err) {
      console.error("Signup error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  
      
})


router.post('/Login',
    body('password').trim().isLength({min:8}),
    body('username').trim().isLength({min:5}),
  async(req,res)=>{
   
    const error = validationResult(req)

    if(!error.isEmpty()){
      return res.status(400).json({
        error:error,
        message:"Invalid Data"
      })
    }

    const {username,password} = req.body

   let user = await userModel.findOne({
    username
   })

   if(!user){
    return res.status(400).json({
      message:"username or password is incorrect"
    })
   }

   const ismatch = await bcrypt.compare(password,user.password)

   if(!ismatch){
    return res.status(400).json({
      message:"username or password is incorrect"
    })
   }

   let token = jwt.sign({
    Userid:user._id,
    email:user.email,
    username:user.username
   },process.env.JWT_SECRET,{expiresIn:"2d"})

  res.cookie("token",token)
  
  res.status(200).json({message:"logged In",token,user:{
     id: user._id,
    username: user.username,
    email: user.email
  }})
  
})



module.exports = router