const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({

    doctorName:{type: String},
    name:{type: String},
    doctorID: {type: String},
    email: {type: String},
    rating: {type: Number},
    message: {type: String},
    appointmentDate: {type: Date},
    appointmentTime: {type: String},
    status: {type: String, default: 'Sent'},
    
  },{timestamps:true});

mongoose.models={}
export default mongoose.model("Appointment", AppointmentSchema);