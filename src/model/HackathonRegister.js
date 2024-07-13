import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const hackathonsSchema = new Schema({
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
  hackathonId:{
    type: Number,
    required:true
  },
  hackathonName:{
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

const Hackathons =  mongoose.models.Hackathons || mongoose.model('Hackathons', hackathonsSchema);

export default Hackathons