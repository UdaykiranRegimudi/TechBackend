import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
const { Schema } = mongoose;

const AutoIncrement = AutoIncrementFactory(mongoose);

const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { _id : false });

const courseSchema = new Schema({
  courseName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  datesAndTimings: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    timings: {
      type: String,
      required: true
    }
  },
  topics: {
    type: [String],
    required: true
  },
  projects: {
    type: [projectSchema],
    required: true
  }
}, {
  timestamps: true
});

courseSchema.plugin(AutoIncrement, { inc_field: 'courseId', start_seq: 1 });

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;
