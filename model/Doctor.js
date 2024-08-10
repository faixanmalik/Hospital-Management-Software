const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({

    doctorID:{type: String},
    doctorName:{type: String},
    hospital:{type: String},
    specialist: {type: String},
    email: {type: String},
    contactNo: {type: String},
    gender: {type: String},
    age: {type: Number},
    joiningDate: {type: Date},
    dob: {type: Date},
    desc: {type: String},
    
  },{timestamps:true});

mongoose.models={}
export default mongoose.model("Doctor", DoctorSchema);