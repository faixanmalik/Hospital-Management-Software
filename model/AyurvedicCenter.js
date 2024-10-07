const mongoose = require('mongoose');

const AyurvedicCenterSchema = new mongoose.Schema({

    centerID:{type: String},
    name:{type: String},
    profilePic: { type: String },
    email:{type: String},
    contactNo: {type: String},
    location: {type: String},
    joiningDate:{type: Date},

    username:{type: String},
    password:{type: String},
    desc: {type: String},
    
  },{timestamps:true});

mongoose.models={}
export default mongoose.model("AyurvedicCenter", AyurvedicCenterSchema);