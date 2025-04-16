const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date
  },
  estimatedEndDate: {
    type: Date
  },
  actualEndDate: {
    type: Date
  },
  budget: {
    type: Number
  },
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'on-hold', 'completed', 'cancelled'],
    default: 'planned'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);