const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    userID:{type: String},
    name:{type: String},
    email:{type: String},
    password:{type: String},
    gender:{type: String},
    contactNo:{type: String},
    address:{type: String},
    dob:{type: Date},

    userType:{type: String, default: 'User'},
    
  },{timestamps:true});

mongoose.models={}
export default mongoose.model("User", UserSchema);