import nodemailer from 'nodemailer'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
// import Registration from './Registation'


const router = express();

router.use(cors());
router.post('/', (req, res) => {
  const { email, subject,studentName,courseName,startDate,endDate } = req.body;
  console.log(req.body)

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'uuday3804@gmail.com',
      pass: 'emut dafm srig xmey'
    }
  });

  const getEmailTemplate = (studentName, courseName, startDate, endDate) => `
  <p>Dear ${studentName},</p>

  <p>We are delighted to inform you that your registration for the <b>${courseName}</b> course has been successfully completed. Welcome aboard!</p>

  <h3>Course Details:</h3>
  <ul>
    <li><b>Course Name:</b> ${courseName}</li>
    <li><b>Start Date:</b> ${startDate}</li>
    <li><b>Duration:</b> ${endDate} weeks</li>
  </ul>

  <h3>What to Expect:</h3>
  <p>Throughout this course, you will:</p>
  <ul>
    <li>Gain in-depth knowledge and skills in key topics.</li>
    <li>Participate in hands-on projects and interactive sessions.</li>
    <li>Access valuable resources and materials to enhance your learning experience.</li>
  </ul>

  <h3>Support:</h3>
  <p>If you have any questions or need assistance, please feel free to reach out to our support team at uuday3804@gmail.com or visit our Support Page/FAQ.</p>

  <p>We are excited to have you as part of the ${courseName} community and look forward to supporting you on your learning journey.</p>

  <p>Best regards,</p>
  <p>Regimudi Uday Kiran<br>
  

  <p><b>Note:</b> This email is automatically generated. Please do not reply to this email.</p>
`;

  const mailOptions = {
    from: 'uuday3804@gmail.com',
    to: email,
    subject: subject,
    html: getEmailTemplate(studentName, courseName, startDate, endDate)
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).json('Email sent: ' + info.response);
  });
});

export { router as Email };
