# 📊 Analytics Setup Guide

## Overview
This guide will help you set up Google Analytics 4 (GA4) to track user behavior on your website.

## Step 1: Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **"Start measuring"** or **"Create Account"**
4. Fill in the account details:
   - Account name: "IdeaBazzar" (or any name)
   - Click **Next**

## Step 2: Set Up a Property

1. **Property name**: "IdeaBazzar Website"
2. **Reporting time zone**: Select your timezone
3. **Currency**: Select your currency (INR)
4. Click **Next**

## Step 3: Configure Business Information

1. Fill in your business details (optional)
2. Click **Next** → **Create**

## Step 4: Get Your Measurement ID

1. After creating the property, you'll see **"Web"** platform option
2. Click **"Web"**
3. Enter your website URL: `https://ideabazzar.com`
4. Enter a stream name: "IdeaBazzar Website"
5. Click **"Create stream"**
6. You'll see your **Measurement ID** (starts with `G-XXXXXXXXXX`)
7. **Copy this Measurement ID** - you'll need it in the next step

## Step 5: Add Measurement ID to Your Project

### Option A: Using Vercel Environment Variables (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `ai-tools-navigator`
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add:
   - **Name**: `VITE_GA_TRACKING_ID`
   - **Value**: `G-XXXXXXXXXX` (your Measurement ID)
   - **Environment**: Production, Preview, Development
6. Click **Save**
7. **Redeploy** your site (Vercel will do this automatically, or you can trigger it manually)

### Option B: Using Local Environment File

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add:
   ```
   VITE_GA_TRACKING_ID=G-XXXXXXXXXX
   ```
3. **Don't commit** `.env` to git (it should be in `.gitignore`)
4. Restart your dev server

## Step 6: Verify Analytics is Working

1. Visit your website: `https://ideabazzar.com`
2. Navigate around, use the AI suggester, submit the form
3. Go to Google Analytics → **Reports** → **Realtime**
4. You should see your activity appear within a few seconds

## Events Being Tracked

### 1. **Page Views**
- When users navigate between "AI Tool Finder" and "MVP Builder" pages

### 2. **MVP Form Submissions**
- Tracks when users submit the MVP form
- Includes: method (meeting/description), budget, timeline

### 3. **AI Tool Suggester Usage**
- Tracks when users use the AI tool suggester
- Includes: task description

### 4. **Meeting Bookings**
- Tracks when users click to book a meeting via Calendly

### 5. **Tool Clicks**
- Tracks when users click on AI tools
- Includes: tool name, category

### 6. **Search Queries**
- Tracks search terms users enter

### 7. **Button Clicks**
- Tracks important button interactions

### 8. **Errors**
- Tracks any errors that occur in the application

## Viewing Analytics Data

### Real-time Reports
- Go to **Reports** → **Realtime** in Google Analytics
- See live user activity

### Custom Reports
- Go to **Explore** → **Blank**
- Create custom reports for specific metrics

### Key Metrics to Monitor
- **Users**: Number of unique visitors
- **Sessions**: Number of visits
- **Page Views**: Which pages users visit
- **Events**: Form submissions, tool clicks, etc.
- **Conversion Rate**: Form submissions per visitor

## Troubleshooting

### Analytics Not Working
1. Check that `VITE_GA_TRACKING_ID` is set correctly
2. Verify the Measurement ID starts with `G-`
3. Check browser console for errors
4. Ensure the analytics script is loading (Network tab)
5. Wait a few minutes for data to appear in GA4

### Events Not Showing
- Events may take a few minutes to appear in GA4
- Check **Events** section in **Realtime** reports
- Verify event names match what's in the code

### Data Not Accurate
- GA4 uses sampling for large datasets
- Real-time reports are accurate but limited to last 30 minutes
- Historical reports may be sampled

## Privacy Considerations

- Analytics collects anonymous usage data
- No personally identifiable information is collected
- Compliant with GDPR if properly configured
- Consider adding a privacy policy to your site

## Next Steps

1. Set up custom dashboards for key metrics
2. Create conversion goals for form submissions
3. Set up email reports for weekly/monthly summaries
4. Configure audience segments for better insights

## Support

- [Google Analytics Help Center](https://support.google.com/analytics)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)

