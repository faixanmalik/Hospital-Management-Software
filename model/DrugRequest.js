const mongoose = require('mongoose');

const DrugRequestSchema = new mongoose.Schema({

    supplierID:{type: String},
    supplierName:{type: String},
    email: { type: String },
    drugID:{type: String},
    drugName: { type: String },
    userEmail: { type: String },
    qty:{type: Number},
    desc: {type: String},
    status: {type: String, default: 'Sent'},
    
  },{timestamps:true});

mongoose.models={}
export default mongoose.model("DrugRequest", DrugRequestSchema);