const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  // Meeting Details
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  
  // Participants
  organizer: {
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
    }
  },
  client: {
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
    }
  },
  
  // Meeting Information
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in minutes
    default: 15
  },
  
  // Meeting Links
  googleMeetLink: {
    type: String,
    trim: true
  },
  meetingId: {
    type: String,
    trim: true
  },
  
  // Status
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'],
    default: 'scheduled'
  },
  
  // Related MVP Request
  mvpRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MvpRequest'
  },
  
  // Meeting Notes
  agenda: [{
    type: String,
    trim: true
  }],
  notes: {
    type: String,
    trim: true
  },
  actionItems: [{
    item: String,
    assignedTo: String,
    dueDate: Date,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  
  // Reminders
  remindersSent: [{
    type: {
      type: String,
      enum: ['email', 'sms'],
      required: true
    },
    sentAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['sent', 'failed', 'delivered'],
      default: 'sent'
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
meetingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
meetingSchema.index({ 'organizer.email': 1, startTime: 1 });
meetingSchema.index({ 'client.email': 1, startTime: 1 });
meetingSchema.index({ status: 1, startTime: 1 });
meetingSchema.index({ mvpRequestId: 1 });

module.exports = mongoose.model('Meeting', meetingSchema);
