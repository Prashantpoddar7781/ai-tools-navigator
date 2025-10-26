const { Resend } = require('resend');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Email templates
const emailTemplates = {
  new_mvp_request: (data) => ({
    from: 'IdeaBazzar <prashantpoddar29@gmail.com>',
    to: data.recipient,
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
      
      <hr>
      <p>This is an automated notification from IdeaBazzar MVP Service.</p>
    `
  }),

  customer_confirmation: (data) => ({
    from: 'IdeaBazzar <prashantpoddar29@gmail.com>',
    to: data.recipient,
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
async function sendEmailNotification({ type, mvpRequest, recipient }) {
  try {
    const template = emailTemplates[type];
    if (!template) {
      throw new Error(`Email template not found for type: ${type}`);
    }

    // Get email data from template
    const emailData = template({ mvpRequest, recipient });

    // Send email using Resend
    const data = await resend.emails.send({
      from: emailData.from,
      to: recipient,
      subject: emailData.subject,
      html: emailData.html
    });

    console.log('✅ Email sent successfully:', data);

    return data;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
}

module.exports = {
  sendEmailNotification
};
