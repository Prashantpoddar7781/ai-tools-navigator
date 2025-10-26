const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  // Use SendGrid if SENDGRID_API_KEY is provided, otherwise use Gmail
  if (process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  } else {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      // Add timeout settings for Render.com
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,   // 10 seconds
      socketTimeout: 10000      // 10 seconds
    });
  }
};

// Email templates
const emailTemplates = {
  new_mvp_request: (data) => ({
    subject: `New MVP Request from ${data.mvpRequest.name}`,
    html: `
      <h2>New MVP Request Received</h2>
      <p><strong>Client:</strong> ${data.mvpRequest.name}</p>
      <p><strong>Email:</strong> ${data.mvpRequest.email}</p>
      <p><strong>Phone:</strong> ${data.mvpRequest.phone || 'Not provided'}</p>
      <p><strong>Project Type:</strong> ${data.mvpRequest.projectType}</p>
      <p><strong>Budget:</strong> ${data.mvpRequest.budget}</p>
      <p><strong>Timeline:</strong> ${data.mvpRequest.timeline}</p>
      <p><strong>Communication Method:</strong> ${data.mvpRequest.communicationMethod}</p>
      
      <h3>Project Description:</h3>
      <p>${data.mvpRequest.projectDescription}</p>
      
      ${data.mvpRequest.targetAudience ? `
      <h3>Target Audience:</h3>
      <p>${data.mvpRequest.targetAudience}</p>
      ` : ''}
      
      ${data.mvpRequest.uniqueSellingPoints ? `
      <h3>Unique Selling Points:</h3>
      <p>${data.mvpRequest.uniqueSellingPoints}</p>
      ` : ''}
      
      ${data.mvpRequest.features && data.mvpRequest.features.length > 0 ? `
      <h3>Features:</h3>
      <ul>
        ${data.mvpRequest.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
      ` : ''}
      
      <p><strong>Request ID:</strong> ${data.mvpRequest._id}</p>
      <p><strong>Submitted:</strong> ${new Date(data.mvpRequest.createdAt).toLocaleString()}</p>
    `
  }),

  meeting_scheduled: (data) => ({
    subject: `Meeting Scheduled - ${data.meeting.title}`,
    html: `
      <h2>Meeting Scheduled Successfully</h2>
      <p>Hello ${data.meeting.client.name},</p>
      
      <p>Your meeting has been scheduled for:</p>
      <ul>
        <li><strong>Date & Time:</strong> ${new Date(data.meeting.startTime).toLocaleString()}</li>
        <li><strong>Duration:</strong> ${data.meeting.duration} minutes</li>
        <li><strong>Meeting Link:</strong> <a href="${data.meeting.googleMeetLink}">Join Meeting</a></li>
      </ul>
      
      ${data.meeting.agenda && data.meeting.agenda.length > 0 ? `
      <h3>Agenda:</h3>
      <ul>
        ${data.meeting.agenda.map(item => `<li>${item}</li>`).join('')}
      </ul>
      ` : ''}
      
      <p>We look forward to discussing your project with you!</p>
      
      <p>Best regards,<br>IdeaBazzar Team</p>
    `
  }),

  meeting_scheduled_admin: (data) => ({
    subject: `Meeting Scheduled - ${data.meeting.title}`,
    html: `
      <h2>Meeting Scheduled</h2>
      <p><strong>Client:</strong> ${data.meeting.client.name} (${data.meeting.client.email})</p>
      <p><strong>Date & Time:</strong> ${new Date(data.meeting.startTime).toLocaleString()}</p>
      <p><strong>Duration:</strong> ${data.meeting.duration} minutes</p>
      <p><strong>Meeting Link:</strong> <a href="${data.meeting.googleMeetLink}">Join Meeting</a></p>
      
      ${data.meeting.agenda && data.meeting.agenda.length > 0 ? `
      <h3>Agenda:</h3>
      <ul>
        ${data.meeting.agenda.map(item => `<li>${item}</li>`).join('')}
      </ul>
      ` : ''}
    `
  }),

  meeting_cancelled: (data) => ({
    subject: `Meeting Cancelled - ${data.meeting.title}`,
    html: `
      <h2>Meeting Cancelled</h2>
      <p>Hello ${data.meeting.client.name},</p>
      
      <p>Your meeting scheduled for ${new Date(data.meeting.startTime).toLocaleString()} has been cancelled.</p>
      
      <p>We apologize for any inconvenience. Please contact us to reschedule.</p>
      
      <p>Best regards,<br>IdeaBazzar Team</p>
    `
  }),

  customer_confirmation: (data) => ({
    subject: `MVP Request Received - IdeaBazzar`,
    html: `
      <h2>Thank You for Your MVP Request!</h2>
      <p>Hello ${data.mvpRequest.name},</p>
      
      <p>We've received your MVP request and are excited to help you bring your idea to life!</p>
      
      <h3>Your Request Details:</h3>
      <ul>
        <li><strong>Project:</strong> ${data.mvpRequest.projectDescription}</li>
        <li><strong>Budget:</strong> ${data.mvpRequest.budget}</li>
        <li><strong>Timeline:</strong> ${data.mvpRequest.timeline}</li>
        <li><strong>Communication Method:</strong> ${data.mvpRequest.communicationMethod}</li>
      </ul>
      
      <h3>What Happens Next?</h3>
      <p>Our team will review your requirements and get back to you within 24 hours with:</p>
      <ul>
        <li>Detailed project timeline</li>
        <li>Exact pricing breakdown</li>
        <li>Next steps to get started</li>
      </ul>
      
      <p><strong>Request ID:</strong> ${data.mvpRequest._id}</p>
      
      <p>If you have any questions, feel free to reply to this email.</p>
      
      <p>Best regards,<br>IdeaBazzar Team</p>
      
      <hr>
      <p style="color: #666; font-size: 12px;">
        This is an automated confirmation. Please do not reply to this email.
      </p>
    `
  })
};

// Send email notification
const sendEmailNotification = async ({ type, ...data }) => {
  try {
    const transporter = createTransporter();
    const template = emailTemplates[type];
    
    if (!template) {
      throw new Error(`Email template not found for type: ${type}`);
    }

    const emailContent = template(data);
    
    const mailOptions = {
      from: `"IdeaBazzar" <${process.env.EMAIL_USER}>`,
      to: data.recipient,
      subject: emailContent.subject,
      html: emailContent.html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;

  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// Send custom email
const sendCustomEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"IdeaBazzar" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Custom email sent successfully:', result.messageId);
    return result;

  } catch (error) {
    console.error('Custom email sending failed:', error);
    throw error;
  }
};

module.exports = {
  sendEmailNotification,
  sendCustomEmail
};
