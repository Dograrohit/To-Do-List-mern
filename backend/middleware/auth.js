const jwt = require("jsonwebtoken")

function auth(req,res,next){
   const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
     
      try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user =  decoded
        return next()
      }catch{
           return res.status(401).json({
            message:'Unauthorized'
        })
      }
}

module.exports = auth