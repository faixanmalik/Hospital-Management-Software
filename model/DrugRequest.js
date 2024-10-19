const mongoose = require('mongoose');

const DrugRequestSchema = new mongoose.Schema({

    supplierID:{type: String},
    supplierName:{type: String},
    email: { type: String },
    drugID:{type: String},
    drugName: { type: String },
    drugType:{type: String},
    desc: {type: String},
    
  },{timestamps:true});

mongoose.models={}
export default mongoose.model("DrugRequest", DrugRequestSchema);