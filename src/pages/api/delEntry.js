import Drug from "@/model/Drug";
import Hospital from "@/model/Hospital";

export default async function handler(req, res) {

  if (req.method == 'POST') {
    const { path } = req.body;

    if (path === 'hospitals') {
      const { selectedIds } = req.body;
      await Hospital.deleteMany({ _id: { $in: selectedIds } })
      res.status(200).json({ success: true, message: "Deleted Successfully !" })
    }
    if (path === 'drugs') {
      const { selectedIds } = req.body;
      await Drug.deleteMany({ _id: { $in: selectedIds } })
      res.status(200).json({ success: true, message: "Deleted Successfully !" })
    }
    
  }
}