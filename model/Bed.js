const mongoose = require('mongoose');

const BedSchema = new mongoose.Schema({

    bedID:{type: String},
    hospitalName:{type: String},
    wardName:{type: String},
    totalBeds: { type: String },
    availableBeds: { type: String },
    desc: {type: String},
    
  },{timestamps:true});

mongoose.models={}
export default mongoose.model("Bed", BedSchema);