const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({

    doctorID: { type: String },
    name: { type: String },
    specialization: { type: String },
    hospital: { type: String },
    email: { type: String },
    contactNo: { type: String },
    gender: { type: String },
    age: { type: Number },
    dob: { type: Date },

    joiningDate: {type: Date},
    desc: {type: String},
    
  },{timestamps:true});

mongoose.models={}
export default mongoose.model("Doctor", DoctorSchema);