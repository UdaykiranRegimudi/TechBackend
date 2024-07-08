import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import {chatbot} from './routes/chatbot.js'
import {register} from './routes/Register.js'
import Registration from './model/Registation.js'


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
app.use("/register",register)

app.get('/register',async(req,res) =>{

})


app.post('/register', async (req, res) => {
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


app.listen(3000,()=>{
    console.log("http://localhost:3000")
})