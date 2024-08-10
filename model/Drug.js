const mongoose = require('mongoose');

const DrugSchema = new mongoose.Schema({

    drugID:{type: String},
    drugName:{type: String},
    drugType:{type: String},

    suppliers: [{
      supplierID: { type: String },
      name: { type: String },
      email: { type: String },
      contactNo: { type: String },
      location: { type: String },
    }],

    joiningDate: {type: Date},
    desc: {type: String},
    
  },{timestamps:true});

mongoose.models={}
export default mongoose.model("Drug", DrugSchema);