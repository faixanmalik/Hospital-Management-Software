const mongoose = require('mongoose');

const PlantDatabaseSchema = new mongoose.Schema({

    scientificSynonyms:{type: String},
    prevNameInWebsite:{type: String},
    familyName:{type: String},
    englishName:{type: String},
    sinhalaName:{type: String},
    profilePic: { type: String },
    tamilName:{type: String},
    sanskritName:{type: String},
    conservationStatus:{type: String},
    desc:{type: String},


  },{timestamps:true});

mongoose.models={}
export default mongoose.model("PlantDatabase", PlantDatabaseSchema);