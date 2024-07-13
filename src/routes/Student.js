import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import Student from '../model/Student.js';

const router = express();

router.use(cors());


router.get('/',async(req,res) =>{
        try{
            const {email} = req.body
            const students = await Student.find();
            res.status(200).json(students);
        }catch(error) {
            res.status(500).json({ message: 'Error fetching students', error });
        }

})


router.post('/', async (req, res) => {
    try {
      const { name, branch, section, year, email } = req.body;
  
      const existingRegistration = await Student.findOne({ email });
  
      if (existingRegistration) {
        return res.status(400).json({ message: 'Email and course combination already exists' });
      }
  
      const newRegistration = new Student({
        name,
        branch,
        section,
        year,
        email
      });
  
      await newRegistration.save();
  
      res.status(200).json({ message: 'Registration successful!' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering', error });
    }
  });

 export {router as StudentData}