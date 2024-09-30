import Doctor from "@/model/Doctor";
import connectDb from '@/middleware/mongoose';

import OpenAI from "openai";
const openai = new OpenAI();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    // Connect to the database
    await connectDb();

    try {
      // Use OpenAI's GPT model to process the patient's message
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {"role": "user", "content": `The patient describes their symptoms as: "${message}". Which medical specialization would be most relevant to handle these symptoms?`}
        ]
    });
    

      const suggestedSpecialization = response.choices[0].message.content.trim();
      console.log("Suggested Specialization: ", suggestedSpecialization);

      // Find doctors in MongoDB that match the suggested specialization
      const doctors = await Doctor.find({
        specialization: { $regex: suggestedSpecialization, $options: 'i' },
      });

      // Respond with the list of matching doctors
      if (doctors.length > 0) {
        res.status(200).json({ success: true, doctors });
      } else {
        res.status(200).json({ success: false, message: 'No doctors found for the suggested specialization.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error fetching doctors', error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}