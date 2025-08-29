const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const list = require("../models/List.model")


router.get("/",auth,async(req,res)=>{
     const massage = await list.find({
        user:req.user.Userid
     })

     res.send({list:massage})
})


router.post("/",auth,async(req,res)=>{
    
    try{
      const {text,check} = req.body
      const newlist = await list.create({
        massage:text,
        user:req.user.Userid
      })
      
      res.send(newlist)
    }catch(err){
       res.send(err)
    }

    
})

router.put("/:id",auth,async(req,res)=>{
    try{
      const {id} = req.params
      const{check}=req.body
      const update = await list.findByIdAndUpdate(
        id,
        {check:check},
        {new:true}
        
      )
      res.json(update)
    }catch(error){
      res.status(500).json({error:"failed to update"})
    }
})

router.delete("/:id",auth,async(req,res)=>{
  try{
    const {id} = req.params

    const deletenote = await list.findByIdAndDelete(id)

    if (!deletenote) {
      return res.status(404).json({ error: "Item not found" });
    }
     
    res.json(deletenote)
  }catch(error){
    res.status(500).json({error:"Failed to Delete"})
  }
})

module.exports = router