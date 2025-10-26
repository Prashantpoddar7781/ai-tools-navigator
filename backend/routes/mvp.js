const express = require('express');
const router = express.Router();
const MvpRequest = require('../models/MvpRequest');
const Meeting = require('../models/Meeting');
const { sendEmailNotification } = require('../utils/emailService');

// Create new MVP request
router.post('/request', async (req, res) => {
  try {
    console.log('📥 MVP request received from:', req.headers.origin);
    console.log('📥 Request body:', req.body);
    const {
      name,
      email,
      phone,
      projectType,
      projectDescription,
      targetAudience,
      uniqueSellingPoints,
      features,
      budget,
      timeline,
      communicationMethod
    } = req.body;

    // Validate required fields
    if (!name || !email || !projectDescription || !budget || !communicationMethod) {
      return res.status(400).json({
        message: 'Missing required fields',
        required: ['name', 'email', 'projectDescription', 'budget', 'communicationMethod']
      });
    }

    // Create new MVP request
    const mvpRequest = new MvpRequest({
      name,
      email,
      phone,
      projectType: projectType || 'other',
      projectDescription,
      targetAudience,
      uniqueSellingPoints,
      features: features || [],
      budget,
      timeline: timeline || 'flexible',
      communicationMethod
    });

    await mvpRequest.save();

    // Send email notifications
    try {
      // Send admin notification
      await sendEmailNotification({
        type: 'new_mvp_request',
        mvpRequest,
        recipient: process.env.ADMIN_EMAIL || 'admin@ideabazzar.com'
      });

      // Send customer confirmation
      await sendEmailNotification({
        type: 'customer_confirmation',
        mvpRequest,
        recipient: mvpRequest.email
      });
      
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      message: 'MVP request submitted successfully',
      requestId: mvpRequest._id,
      status: mvpRequest.status
    });

  } catch (error) {
    console.error('Error creating MVP request:', error);
    res.status(500).json({
      message: 'Failed to create MVP request',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get all MVP requests (admin only)
router.get('/requests', async (req, res) => {
  try {
    const { status, projectType, page = 1, limit = 10 } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (projectType) filter.projectType = projectType;

    const requests = await MvpRequest.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('meetings');

    const total = await MvpRequest.countDocuments(filter);

    res.json({
      requests,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Error fetching MVP requests:', error);
    res.status(500).json({
      message: 'Failed to fetch MVP requests',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get single MVP request
router.get('/request/:id', async (req, res) => {
  try {
    const request = await MvpRequest.findById(req.params.id)
      .populate('meetings');

    if (!request) {
      return res.status(404).json({ message: 'MVP request not found' });
    }

    res.json(request);

  } catch (error) {
    console.error('Error fetching MVP request:', error);
    res.status(500).json({
      message: 'Failed to fetch MVP request',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update MVP request status
router.patch('/request/:id/status', async (req, res) => {
  try {
    const { status, assignedTo, notes } = req.body;

    const updateData = { status };
    if (assignedTo) updateData.assignedTo = assignedTo;
    if (notes) {
      updateData.$push = {
        notes: {
          note: notes,
          addedBy: req.body.addedBy || 'system',
          addedAt: new Date()
        }
      };
    }

    const request = await MvpRequest.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: 'MVP request not found' });
    }

    res.json({
      message: 'MVP request status updated successfully',
      request
    });

  } catch (error) {
    console.error('Error updating MVP request:', error);
    res.status(500).json({
      message: 'Failed to update MVP request',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get MVP request statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await MvpRequest.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const projectTypeStats = await MvpRequest.aggregate([
      {
        $group: {
          _id: '$projectType',
          count: { $sum: 1 }
        }
      }
    ]);

    const budgetStats = await MvpRequest.aggregate([
      {
        $group: {
          _id: '$budget',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      statusStats: stats,
      projectTypeStats,
      budgetStats
    });

  } catch (error) {
    console.error('Error fetching MVP statistics:', error);
    res.status(500).json({
      message: 'Failed to fetch statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;
