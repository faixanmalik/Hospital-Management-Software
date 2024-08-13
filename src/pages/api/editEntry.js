import Hospital from "@/model/Hospital";
import Drug from "@/model/Drug";
import AyurvedicCenter from "@/model/AyurvedicCenter";
import Doctor from "@/model/Doctor";

export default async function handler(req, res) {

  if (req.method == 'POST') {
    const { path } = req.body;

    if (path === 'hospitals') {
      const { id, hospitalData } = req.body;

      await Hospital.updateOne({ _id: id }, hospitalData);
      res.status(200).json({ success: true, message: "Update Successfully!" })
    }
    else if (path === 'drugs') {
      const { id, drugData } = req.body;

      await Drug.updateOne({ _id: id }, drugData);
      res.status(200).json({ success: true, message: "Update Successfully!" })
    }
    else if (path === 'ayurvedicCenters') {
      const { id, centerData } = req.body;

      await AyurvedicCenter.updateOne({ _id: id }, centerData);
      res.status(200).json({ success: true, message: "Update Successfully!" })
    }
    else if (path === 'Doctors') {
      const { id, doctorData } = req.body;

      await Doctor.updateOne({ _id: id }, doctorData);
      res.status(200).json({ success: true, message: "Update Successfully!" })
    }
    
  }
}