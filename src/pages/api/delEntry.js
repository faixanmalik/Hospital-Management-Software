import Drug from "@/model/Drug";
import Hospital from "@/model/Hospital";
import AyurvedicCenter from "@/model/AyurvedicCenter";
import Doctor from "@/model/Doctor";
import Bed from "@/model/Bed";
import DrugSupplier from "@/model/DrugSupplier";
import PlantDatabase from "@/model/PlantDatabase";

export default async function handler(req, res) {

  if (req.method == 'POST') {
    const { path } = req.body;

    if (path === 'hospitals') {
      const { selectedIds } = req.body;
      
      await Hospital.deleteMany({ _id: { $in: selectedIds } })
      res.status(200).json({ success: true, message: "Deleted Successfully !" })
    }
    else if (path === 'drugs') {
      const { selectedIds } = req.body;

      await Drug.deleteMany({ _id: { $in: selectedIds } })
      res.status(200).json({ success: true, message: "Deleted Successfully !" })
    }
    else if (path === 'DrugsSuppliers') {
      const { selectedIds } = req.body;

      await DrugSupplier.deleteMany({ _id: { $in: selectedIds } })
      res.status(200).json({ success: true, message: "Deleted Successfully !" })
    }
    else if (path === 'ayurvedicCenters') {
      const { selectedIds } = req.body;

      await AyurvedicCenter.deleteMany({ _id: { $in: selectedIds } })
      res.status(200).json({ success: true, message: "Deleted Successfully !" })
    }
    else if (path === 'Doctors') {
      const { selectedIds } = req.body;

      await Doctor.deleteMany({ _id: { $in: selectedIds } })
      res.status(200).json({ success: true, message: "Deleted Successfully !" })
    }
    else if (path === 'Beds') {
      const { selectedIds } = req.body;

      await Bed.deleteMany({ _id: { $in: selectedIds } })
      res.status(200).json({ success: true, message: "Deleted Successfully !" })
    }
    else if (path === 'plantData') {
      const { selectedIds } = req.body;

      await PlantDatabase.deleteMany({ _id: { $in: selectedIds } })
      res.status(200).json({ success: true, message: "Deleted Successfully !" })
    }
    
  }
}