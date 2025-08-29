const jwt = require("jsonwebtoken")

function auth(req,res,next){
   let token = null;

  if (req.cookies?.token) {
    token = req.cookies.token; // cookie way
  } else if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1]; // Bearer way
  }
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