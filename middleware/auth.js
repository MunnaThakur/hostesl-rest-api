import jwt from "jsonwebtoken";


export const requireAuth = (req, res, next) => {
  const cookies = req.headers.cookie;

  const token  = cookies.split("=")[1]
  
  if(!token){
    res.status(404).json({"message":"No token found"});
  }
  
  jwt.verify(String(token), "test", (err, user)=>{
    if(err){
      return res.status(400).json({"message":"Invalid Token"})
    }
    req.id = user.id;
  })
  next();
};
