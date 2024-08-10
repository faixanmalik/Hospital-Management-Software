import Hospital from "@/model/Hospital";

export default async function handler(req, res) {

  if (req.method == 'POST') {
    const { path } = req.body;

    if (path === 'hospitals') {
      const { selectedIds } = req.body;
      await Hospital.deleteMany({ _id: { $in: selectedIds } })
      res.status(200).json({ success: true, message: "Deleted Successfully !" })
    }
    
  }
}