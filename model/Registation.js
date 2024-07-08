import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  year: {
    type: Number, 
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  courseId:{
    type:String,
    required:true
  },
  course:{
    type:String,
    required:true,
    
  },
  date: {
    type: Date,
    required: false,
    default: Date.now
  }
}, {
  timestamps: true
});

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration