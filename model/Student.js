import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const studentSchema = new Schema({
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
  date: {
    type: Date,
    required: false,
    default: Date.now
  }
}, {
  timestamps: true
});

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);


export default Student