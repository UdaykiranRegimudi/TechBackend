// routes/admin.js

import express from 'express';
import cors from 'cors';
import Admin from '../model/Admin.js'

const router = express.Router();

router.use(cors());
router.use(express.json());

// Get all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error });
  }
});

// Add a new admin
router.post('/', async (req, res) => {
  try {
    const { email, name, id } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    const newAdmin = new Admin({
      email,
      name,
      id
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Admin added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding admin', error });
  }
});

export { router as adminRouter };
