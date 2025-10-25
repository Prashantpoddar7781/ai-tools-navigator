# MVP Service Backend

A Node.js/Express backend for handling MVP requests and meeting scheduling.

## Features

- **MVP Request Management**: Handle project requests with detailed information
- **Meeting Scheduling**: Schedule and manage client meetings
- **Email Notifications**: Automated email notifications for requests and meetings
- **Database Integration**: MongoDB for data persistence
- **RESTful API**: Clean API endpoints for frontend integration

## Setup Instructions

### 1. Environment Setup

1. Copy `env.example` to `.env`:
```bash
cp env.example .env
```

2. Update the `.env` file with your configuration:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/mvp-service
# or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/mvp-service

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Server
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 2. Database Setup

**Option A: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Use `mongodb://localhost:27017/mvp-service`

**Option B: MongoDB Atlas (Recommended)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string and update `MONGODB_URI`

### 3. Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the app password in `EMAIL_PASS`

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

## API Endpoints

### MVP Requests

- `POST /api/mvp/request` - Create new MVP request
- `GET /api/mvp/requests` - Get all MVP requests (admin)
- `GET /api/mvp/request/:id` - Get single MVP request
- `PATCH /api/mvp/request/:id/status` - Update request status
- `GET /api/mvp/stats` - Get request statistics

### Meetings

- `POST /api/meetings/schedule` - Schedule new meeting
- `GET /api/meetings` - Get all meetings
- `GET /api/meetings/:id` - Get single meeting
- `PATCH /api/meetings/:id` - Update meeting
- `PATCH /api/meetings/:id/cancel` - Cancel meeting

### Health Check

- `GET /api/health` - Server health check

## Database Schema

### MvpRequest
- Contact information (name, email, phone)
- Project details (type, description, features)
- Budget and timeline
- Communication preferences
- Status tracking

### Meeting
- Meeting details (title, description, time)
- Participants (organizer, client)
- Google Meet integration
- Status and notes

## Frontend Integration

The frontend will need to make API calls to these endpoints. Update your frontend to:

1. **Submit MVP Requests**: POST to `/api/mvp/request`
2. **Schedule Meetings**: POST to `/api/meetings/schedule`
3. **Handle Responses**: Process API responses and show success/error messages

## Deployment

### Option 1: Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Option 2: Railway/Render
1. Connect repository
2. Set environment variables
3. Deploy

### Option 3: Traditional VPS
1. Set up Node.js environment
2. Install PM2 for process management
3. Configure reverse proxy (Nginx)
4. Set up SSL certificates

## Next Steps

1. Set up the backend server
2. Configure environment variables
3. Test API endpoints
4. Integrate with frontend
5. Set up monitoring and logging
