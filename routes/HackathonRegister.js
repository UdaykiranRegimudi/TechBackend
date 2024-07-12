import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import Hackathons from '../model/HackathonRegister.js'; 

dotenv.config();

const router = express.Router();

router.use(cors());

router.get('/', async (req, res) => {
  try {
    const registrations = await Hackathons.find();
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registrations', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, branch, section, year, email, hackathonName ,hackathonId} = req.body;
    console.log(req.body)

    const existingRegistration = await Hackathons.findOne({ email, hackathonName });

    if (existingRegistration) {
      return res.status(400).json({ message: 'Email and hackathon combination already exists' });
    }

    const newRegistration = new Hackathons({
      name,
      branch,
      section,
      year,
      email,
      hackathonId,
      hackathonName
    });
    await newRegistration.save();

    res.status(200).json({ message: 'Registration successful!' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error registering', error });
  }
});

export { router as HackathonRegister };
