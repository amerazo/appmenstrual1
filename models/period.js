const mongoose = require('mongoose');
const periodSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  flowLength: {
    type: Number,
    required: true
  },
  notes: {
    type: String
  },
  flowLevel: {
    type: String,
    enum: ['spotting', 'light', 'medium', 'heavy']
  },
  cramps: {
    type: String,
    enum: ['Light Cramps']
  },
  emotional: [{
    type: String,
    enum: ['sad', 'tearful', 'anxious', 'angry', 'frustrated', 'joyful', 'peaceful', 'meh']
  }],
  physical: [{
    type: String,
    enum: ['breast sensitivity', 'back pain', 'nausea', 'bloating', 'cramps', 'other']
  }],
  otherPhysical: {
    type: String
  },
  discharge: [{
    type: String,
    enum: ['clear', 'do not want to answer', 'none']
  }],
  temperature: {
    type: Number
  }
}, {
  timestamps: true
});

const Period = mongoose.model('Period', periodSchema);
module.exports = Period;


//Reference: https://youtu.be/EXEvXOG6vgU
//Reference: https://kb.objectrocket.com/mongo-db/a-nodejs-mongoose-schema-example-1204