import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import {chatbot} from './routes/Chatbot.js'
import { Email } from './routes/Email.js';
import { CourseRegister } from './routes/CourseRegister.js';
import {HackathonRegister} from './routes/HackathonRegister.js'
import {Course} from './routes/Course.js'
import { StudentData } from './routes/Student.js';
import { adminRouter } from './routes/Admin.js';
import { Hackathon } from './routes/Hackathon.js';


dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;


try{
    mongoose.connect(MONGO_URI);
    console.log("Mongo Connected")
}catch(e){
    console.log(e)
}


const app = express()

app.use(express.json())
app.use(cors())



app.use("/chatbot",chatbot)
app.use("/email",Email)
app.use("/courseRegister",CourseRegister)
app.use("/hackathonRegister",HackathonRegister)
app.use("/course",Course)
app.use("/student",StudentData)
app.use("/admin",adminRouter)
app.use("/hackathon",Hackathon)



app.listen(3000,()=>{
    console.log("http://localhost:3000")
})