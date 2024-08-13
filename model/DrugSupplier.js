const mongoose = require('mongoose');

const DrugSupplierSchema = new mongoose.Schema({

    supplierID:{type: String},
    supplierName:{type: String},
    email: { type: String },
    contactNo: { type: String },
    location: { type: String },
    joiningDate: {type: Date},
    desc: {type: String},
    
  },{timestamps:true});

mongoose.models={}
export default mongoose.model("DrugSupplier", DrugSupplierSchema);