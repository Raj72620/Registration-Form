const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  collegeId: { type: String, required: true },
  phone: { type: String, required: true },
  year: { type: String, enum: ["1st", "2nd", "3rd", "4th"], required: true },
  department: { 
    type: String, 
    enum: ["CSE", "CSD", "IT", "ECE", "EEE", "CIVIL", "MECHANICAL"], 
    required: true 
  },
   resume: {
    path: String,
    originalName: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }}
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);