import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { chatbot } from './routes/Chatbot.js';
import { Email } from './routes/Email.js';
import { CourseRegister } from './routes/CourseRegister.js';
import { HackathonRegister } from './routes/HackathonRegister.js';
import { Course } from './routes/Course.js';
import { StudentData } from './routes/Student.js';
import { adminRouter } from './routes/Admin.js';
import { Hackathon } from './routes/Hackathon.js';

// Load environment variables from .env file
dotenv.config();

// MongoDB URI from environment variables
const MONGO_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.error('MongoDB connection error:', error));

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Route setup
app.use("/chatbot", chatbot);
app.use("/email", Email);
app.use("/courseRegister", CourseRegister);
app.use("/hackathonRegister", HackathonRegister);
app.use("/course", Course);
app.use("/student", StudentData);
app.use("/admin", adminRouter);
app.use("/hackathon", Hackathon);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
