import Hospital from "@/model/Hospital";
import Drug from "@/model/Drug";

export default async function handler(req, res) {

  if (req.method == 'POST') {
    const { path } = req.body;

    if (path === 'hospitals') {
      const { id } = req.body;

      await Hospital.updateOne({ _id: id }, req.body);
      res.status(200).json({ success: true, message: "Update Successfully!" })
    }
    else if (path === 'drugs') {
      const { id } = req.body;

      await Drug.updateOne({ _id: id }, req.body);
      res.status(200).json({ success: true, message: "Update Successfully!" })
    }
    
  }
}