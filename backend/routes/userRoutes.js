const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { sendEmail } = require('../utils/emailService');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer for file uploads
const uploadDir = 'uploads/resumes';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const sanitizedName = file.originalname.replace(/[^a-z0-9.-]/gi, '_');
    cb(null, 'resume-' + uniqueSuffix + path.extname(sanitizedName));
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = /pdf|doc|docx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// Updated Register User with file upload
router.post('/register', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, collegeId, phone, year, department } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Remove uploaded file if user exists
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Email already registered' });
    }

    const userData = { 
      name, 
      email, 
      collegeId, 
      phone, 
      year, 
      department 
    };

    // Add resume data if file was uploaded
    if (req.file) {
      userData.resume = {
        path: req.file.path,
        originalName: req.file.originalname,
        uploadedAt: new Date()
      };
    }

    const user = new User(userData);
    await user.save();

    // Enhanced email with HTML template
    const emailSubject = 'Registration Confirmation';
    const emailText = `Dear ${name},\n\nThank you for registering with us!\n\nYour details:\nCollege ID: ${collegeId}\nDepartment: ${department}\nYear: ${year}`;
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3498db;">Registration Successful!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for registering with our college portal.</p>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3 style="margin-top: 0;">Your Registration Details:</h3>
          <p><strong>College ID:</strong> ${collegeId}</p>
          <p><strong>Department:</strong> ${department}</p>
          <p><strong>Year:</strong> ${year}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          ${req.file ? `<p><strong>Resume:</strong> ${req.file.originalname}</p>` : ''}
        </div>
        
        <p>If you have any questions, please contact our administration.</p>
        <p style="margin-top: 30px;">Best regards,<br>College Administration Team</p>
      </div>
    `;

    await sendEmail(email, emailSubject, emailText, emailHtml);

    res.status(201).json({ 
      message: 'User registered successfully! Confirmation email sent.',
      user: {
        name,
        email,
        collegeId,
        department,
        year,
        hasResume: !!req.file
      }
    });

  } catch (error) {
    // Clean up uploaded file if error occurs
    if (req.file) fs.unlinkSync(req.file.path);
    
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: error.message || 'Registration failed. Please try again.' 
    });
  }
});

// Get All Users (For Admin)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ 
      error: error.message || 'Failed to fetch users' 
    });
  }
});

// New endpoint to download resume
router.get('/resume/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user || !user.resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.download(user.resume.path, user.resume.originalName);
  } catch (error) {
    res.status(500).json({ error: 'Error downloading resume' });
  }
});

module.exports = router;