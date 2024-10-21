import Drug from "@/model/Drug";
import Hospital from "@/model/Hospital";
import AyurvedicCenter from "@/model/AyurvedicCenter";
import Doctor from "@/model/Doctor";
import Bed from "@/model/Bed";
import DrugSupplier from "@/model/DrugSupplier";
import Appointment from "@/model/Appointment";
import PlantDatabase from "@/model/PlantDatabase";
import DrugRequest from "@/model/DrugRequest";

export default async function handler(req, res) {

  if (req.method == 'POST') {
    const { path } = req.body;


    if (path === 'hospitals') {
      const { hospitalData  } = req.body;

      let newEntry = new Hospital(hospitalData);
      await newEntry.save();
      res.status(200).json({ success: true, data:hospitalData,  message: "Entry Added!" })
    }
    else if (path === 'drugs') {
      const { drugData  } = req.body;

      let newEntry = new Drug(drugData);
      await newEntry.save();
      res.status(200).json({ success: true, data:drugData,  message: "Entry Added!" })
    }
    else if (path === 'DrugsSuppliers') {
      const { supplierData  } = req.body;

      let newEntry = new DrugSupplier(supplierData);
      await newEntry.save();
      res.status(200).json({ success: true, data:supplierData,  message: "Entry Added!" })
    }
    else if (path === 'ayurvedicCenters') {
      const { centerData  } = req.body;

      let newEntry = new AyurvedicCenter(centerData);
      await newEntry.save();
      res.status(200).json({ success: true, data:centerData,  message: "Entry Added!" })
    }
    else if (path === 'Doctors') {
      const { doctorData  } = req.body;

      let newEntry = new Doctor(doctorData);
      await newEntry.save();
      res.status(200).json({ success: true, data:doctorData,  message: "Entry Added!" })
    }
    else if (path === 'Beds') {
      const { bedData  } = req.body;

      let newEntry = new Bed(bedData);
      await newEntry.save();
      res.status(200).json({ success: true, data:bedData,  message: "Entry Added!" })
    }
    else if (path === 'Appointment') {
      const { appointmentData  } = req.body;

      let newEntry = new Appointment(appointmentData);
      await newEntry.save();
      res.status(200).json({ success: true, data:appointmentData, message: "Appointment Sent!" })
    }
    else if (path === 'PlantDatabase') {
      const { plantData  } = req.body;

      let newEntry = new PlantDatabase(plantData);
      await newEntry.save();
      res.status(200).json({ success: true, data:plantData, message: "Appointment Sent!" })
    }
    else if (path === 'RequestDrug') {
      const { requestData  } = req.body;

      let newEntry = new DrugRequest(requestData);
      await newEntry.save();
      res.status(200).json({ success: true, data:requestData,  message: "Request Sent!" })
    }


    
    else{
      res.status(400).json({ success: false, message: "Internal Server Error!" })
    }

  }
  else {
    res.status(400).json({ success: false, message: "Internal Server Error !" })
  }
}