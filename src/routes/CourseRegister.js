import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import Registration from '../model/CourseRegister.js';

const router = express();

router.use(cors());


router.get('/',async(req,res) =>{

})


router.post('/', async (req, res) => {
    try {
      const { name, branch, section, year, email, course, courseId } = req.body;
  
      const existingRegistration = await Registration.findOne({ email, course });
  
      if (existingRegistration) {
        return res.status(400).json({ message: 'Email and course combination already exists' });
      }
  
      const newRegistration = new Registration({
        name,
        branch,
        section,
        year,
        email,
        course,
        courseId
      });
  
      await newRegistration.save();
  
      res.status(200).json({ message: 'Registration successful!' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering', error });
    }
  });

 export {router as CourseRegister}