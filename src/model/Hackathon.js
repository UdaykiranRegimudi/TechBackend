import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const { Schema } = mongoose;
const AutoIncrement = AutoIncrementFactory(mongoose);

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cta: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  rules: {
    type: [String],
    required: true
  },
  technologies: {
    type: [String],
    required: true
  },
  registrationGuidelines: {
    type: [String],
    required: true
  },
  prizes: {
    type: [String],
    required: true
  },
}, {
  timestamps: true
});

eventSchema.plugin(AutoIncrement, { inc_field: 'hackId', start_seq: 1 });

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;
