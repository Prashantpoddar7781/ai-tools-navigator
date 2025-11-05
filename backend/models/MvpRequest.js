const mongoose = require('mongoose');

const mvpRequestSchema = new mongoose.Schema({
  // Contact Information
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  
  // Project Details
  projectType: {
    type: String,
    required: true,
    enum: ['website', 'mobile-app', 'web-app', 'ecommerce', 'marketing-campaign', 'video-content', 'other'],
    default: 'other'
  },
  projectDescription: {
    type: String,
    required: true,
    trim: true
  },
  targetAudience: {
    type: String,
    trim: true
  },
  uniqueSellingPoints: {
    type: String,
    trim: true
  },
  features: [{
    type: String,
    trim: true
  }],
  
  // Budget and Timeline
  budget: {
    type: String,
    required: true,
    trim: true,
    // Accept any price string (e.g., '₹179', '₹199', etc.) - no longer restricted to ranges
    validate: {
      validator: function(value) {
        // Allow any string that starts with ₹ followed by a number
        return /^₹\d+$/.test(value) || /^₹\d+-₹\d+$/.test(value);
      },
      message: 'Budget must be in format ₹[number] or ₹[number]-₹[number]'
    }
  },
  timeline: {
    type: String,
    enum: ['ASAP', '1 week', '2 weeks', '1 month', 'flexible'],
    default: 'flexible'
  },
  
  // Communication Preference
  communicationMethod: {
    type: String,
    enum: ['meeting', 'description'],
    required: true
  },
  
  // Meeting Details (if applicable)
  meetingScheduled: {
    type: Boolean,
    default: false
  },
  meetingDateTime: {
    type: Date
  },
  meetingLink: {
    type: String,
    trim: true
  },
  
  // Payment Information
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: String,
    trim: true
  },
  paymentDate: {
    type: Date
  },
  amountPaid: {
    type: Number
  },
  
  // Status Tracking
  status: {
    type: String,
    enum: ['new', 'in-progress', 'completed', 'cancelled'],
    default: 'new'
  },
  assignedTo: {
    type: String,
    trim: true
  },
  notes: [{
    note: String,
    addedBy: String,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
mvpRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
mvpRequestSchema.index({ email: 1, createdAt: -1 });
mvpRequestSchema.index({ status: 1 });
mvpRequestSchema.index({ projectType: 1 });

module.exports = mongoose.model('MvpRequest', mvpRequestSchema);
