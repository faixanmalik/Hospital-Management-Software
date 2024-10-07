const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({

    hospitalID:{type: String},
    name:{type: String},
    profilePic: { type: String },
    email:{type: String},
    location: {type: String},
    contactNo: {type: String},
    noOfDoctors: {type: String},
    noOfWards: {type: String},
    noOfBeds: {type: String},
    username: {type: String},
    password: {type: String},
    desc: {type: String},
    
  },{timestamps:true});

mongoose.models={}
export default mongoose.model("Hospital", HospitalSchema);