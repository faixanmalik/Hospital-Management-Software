import connectDb from '@/middleware/mongoose'
import User from '@/model/User';
// Jwt token
var jwt = require('jsonwebtoken');


const handler = async (req,res)=>{
  if (req.method == 'POST'){

    
    let user = await User.findOne({ "email": req.body.email })
    
    if (user){

      if (req.body.email === user.email && req.body.password === user.password){
        
        var token = jwt.sign({ email:user.email, name:user.name, userType: user.userType }, process.env.JWT_SECRET);
        
        res.status(200).json({ success: true, message: "Succesfully Log In!", token, email:user.email, userType:user.userType })
        
      }
      else{
        res.status(400).json({ success: false, message: "Invalid Credentials!" })
      }

    }
    else{
      res.status(400).json({ success: false , message: "No user Found!" })
    }

  }
  else{
    res.status(400).json({ success: false , message: "Internal Server Error!" })
  }

}
export default connectDb(handler);