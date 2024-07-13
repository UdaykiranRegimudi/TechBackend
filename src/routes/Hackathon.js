import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import Event from '../model/Hackathon.js'; // Ensure the correct import path

dotenv.config();

const router = express.Router();

router.use(cors());

router.get('/', async (req, res) => {
  try {
    const registrations = await Event.find();
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registrations', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      title,
      date,
      time,
      description,
      cta,
      imageUrl,
      rules,
      technologies,
      registrationGuidelines,
      prizes,
    } = req.body;

    const existingRegistration = await Event.findOne({title});

    if (existingRegistration) {
      return res.status(400).json({ message: 'Id and hackathon combination already exists' });
    }
    
    const newRegistration = new Event({
      title,
      date,
      time,
      description,
      cta,
      imageUrl,
      rules,
      technologies,
      registrationGuidelines,
      prizes,
    });

    await newRegistration.save();

    res.status(200).json({ message: 'Registration successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering', error });
  }
});

export { router as Hackathon };
