import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import Course from '../model/Course.js'


dotenv.config();

const router = express.Router();

router.use(cors());






router.get('/', async (req, res) => {
    try {
      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching courses', error });
    }
  });
  
  // Add a new course
router.post('/', async (req, res) => {
    try {
      const { courseName, description, about, imageUrl, datesAndTimings, topics, projects } = req.body;
  
      const newCourse = new Course({
        courseName,
        description,
        about,
        imageUrl,
        datesAndTimings,
        topics,
        projects
      });
  
      await newCourse.save();
  
      res.status(201).json({ message: 'Course added successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding course', error });
    }
  });
  
  // Update a course
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { courseName, description, about, imageUrl, datesAndTimings, topics, projects } = req.body;
  
      const updatedCourse = await Course.findOneAndUpdate(
        { id },
        { courseName, description, about, imageUrl, datesAndTimings, topics, projects },
        { new: true }
      );
  
      if (!updatedCourse) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      res.status(200).json({ message: 'Course updated successfully!', updatedCourse });
    } catch (error) {
      res.status(500).json({ message: 'Error updating course', error });
    }
  });
  
  // Delete a course
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedCourse = await Course.findOneAndDelete({ id });
  
      if (!deletedCourse) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      res.status(200).json({ message: 'Course deleted successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting course', error });
    }
  });

  export {router as Course}