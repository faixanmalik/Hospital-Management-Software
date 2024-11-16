import connectDb from "@/middleware/mongoose";
import User from "@/model/User";

const handler = async (req,res)=>{

    if (req.method == 'POST'){

      const { email, password } = req.body;
      
      let user = await User.findOne({"email": email})
      if (user){
        res.status(400).json({ success: false, message: "Already have an account!"})
      }
      else{

        let newuser = new User( { email , password, userType:'User' });
        await newuser.save();
        res.status(200).json({ success: true, message: "New User added Succesfully!"})

      }
    }
  }


export default connectDb(handler);