import Hospital from "@/model/Hospital";

export default async function handler(req, res) {

  if (req.method == 'POST') {
    const { path } = req.body;


    if (path === 'hospitals') {
      const { hospitalData  } = req.body;

      let newEntry = new Hospital(hospitalData);
      await newEntry.save();
      res.status(200).json({ success: true, data:hospitalData,  message: "Entry Added!" })
    }
    else{
      res.status(400).json({ success: false, message: "Internal Server Error!" })
    }

  }
  else {
    res.status(400).json({ success: false, message: "Internal Server Error !" })
  }
}