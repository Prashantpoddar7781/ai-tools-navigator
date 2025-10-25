const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');
const MvpRequest = require('../models/MvpRequest');
const { sendEmailNotification } = require('../utils/emailService');

// Create new meeting
router.post('/schedule', async (req, res) => {
  try {
    const {
      title,
      description,
      organizer,
      client,
      startTime,
      endTime,
      duration = 15,
      mvpRequestId,
      agenda = []
    } = req.body;

    // Validate required fields
    if (!title || !organizer || !client || !startTime) {
      return res.status(400).json({
        message: 'Missing required fields',
        required: ['title', 'organizer', 'client', 'startTime']
      });
    }

    // Generate Google Meet link (you can integrate with Google Calendar API)
    const googleMeetLink = await generateGoogleMeetLink({
      title,
      startTime,
      endTime
    });

    // Create new meeting
    const meeting = new Meeting({
      title,
      description,
      organizer,
      client,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      duration,
      googleMeetLink,
      mvpRequestId,
      agenda
    });

    await meeting.save();

    // Update MVP request if provided
    if (mvpRequestId) {
      await MvpRequest.findByIdAndUpdate(mvpRequestId, {
        meetingScheduled: true,
        meetingDateTime: new Date(startTime),
        meetingLink: googleMeetLink
      });
    }

    // Send meeting confirmation emails
    try {
      await sendEmailNotification({
        type: 'meeting_scheduled',
        meeting,
        recipient: client.email
      });

      await sendEmailNotification({
        type: 'meeting_scheduled_admin',
        meeting,
        recipient: process.env.ADMIN_EMAIL || 'admin@ideabazzar.com'
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the meeting creation if email fails
    }

    res.status(201).json({
      message: 'Meeting scheduled successfully',
      meetingId: meeting._id,
      googleMeetLink: meeting.googleMeetLink
    });

  } catch (error) {
    console.error('Error scheduling meeting:', error);
    res.status(500).json({
      message: 'Failed to schedule meeting',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get all meetings
router.get('/', async (req, res) => {
  try {
    const { status, startDate, endDate, page = 1, limit = 10 } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (startDate || endDate) {
      filter.startTime = {};
      if (startDate) filter.startTime.$gte = new Date(startDate);
      if (endDate) filter.startTime.$lte = new Date(endDate);
    }

    const meetings = await Meeting.find(filter)
      .sort({ startTime: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('mvpRequestId');

    const total = await Meeting.countDocuments(filter);

    res.json({
      meetings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Error fetching meetings:', error);
    res.status(500).json({
      message: 'Failed to fetch meetings',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get single meeting
router.get('/:id', async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id)
      .populate('mvpRequestId');

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.json(meeting);

  } catch (error) {
    console.error('Error fetching meeting:', error);
    res.status(500).json({
      message: 'Failed to fetch meeting',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update meeting
router.patch('/:id', async (req, res) => {
  try {
    const { status, notes, actionItems } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (notes) updateData.notes = notes;
    if (actionItems) updateData.actionItems = actionItems;

    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('mvpRequestId');

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.json({
      message: 'Meeting updated successfully',
      meeting
    });

  } catch (error) {
    console.error('Error updating meeting:', error);
    res.status(500).json({
      message: 'Failed to update meeting',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Cancel meeting
router.patch('/:id/cancel', async (req, res) => {
  try {
    const { reason } = req.body;

    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'cancelled',
        notes: reason ? `Cancelled: ${reason}` : 'Meeting cancelled'
      },
      { new: true }
    ).populate('mvpRequestId');

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    // Send cancellation emails
    try {
      await sendEmailNotification({
        type: 'meeting_cancelled',
        meeting,
        recipient: meeting.client.email
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
    }

    res.json({
      message: 'Meeting cancelled successfully',
      meeting
    });

  } catch (error) {
    console.error('Error cancelling meeting:', error);
    res.status(500).json({
      message: 'Failed to cancel meeting',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Helper function to generate Google Meet link
async function generateGoogleMeetLink({ title, startTime, endTime }) {
  // For now, return a placeholder. In production, integrate with Google Calendar API
  // to create actual Google Meet links
  const meetingId = Math.random().toString(36).substring(2, 15);
  return `https://meet.google.com/${meetingId}`;
}

module.exports = router;
