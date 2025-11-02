# 📅 Calendly + Google Meet Integration Setup Guide

## Overview
This guide will help you set up Calendly with Google Meet integration so that when users book a meeting, a Google Meet link is automatically created.

## Step 1: Create a Calendly Account

1. Go to [https://calendly.com](https://calendly.com)
2. Sign up for a free account (or upgrade to paid if needed)
3. Verify your email address

## Step 2: Connect Google Calendar

1. In Calendly, go to **Settings** → **Integrations**
2. Click **Connect** next to Google Calendar
3. Sign in with your Google account
4. Grant Calendly permission to access your calendar

## Step 3: Create an Event Type

1. Go to **Event Types** in Calendly
2. Click **+ New Event Type**
3. Configure your event:
   - **Name**: "15-Minute MVP Consultation" (or any name you prefer)
   - **Duration**: 15 minutes
   - **Location**: Select "Google Meet"
   - **Description**: Add details about what the meeting will cover
4. Save the event type

## Step 4: Enable Google Meet

1. In your event type settings, scroll to **Location**
2. Make sure **"Google Meet"** is selected
3. This will automatically add Google Meet links to all bookings

## Step 5: Get Your Calendly Link

1. After creating your event type, you'll see a link like:
   `https://calendly.com/your-username/15-minute-mvp-consultation`
2. Copy this link

## Step 6: Update Your Code

1. Open `constants.ts` in your project
2. Find `CALENDLY_LINK`
3. Replace the placeholder with your actual Calendly link:

```typescript
export const CALENDLY_LINK = "https://calendly.com/your-username/your-event-type";
```

4. Save the file
5. Deploy to production (Vercel will auto-deploy)

## Step 7: Test the Integration

1. Go to your website: `https://ideabazzar.com`
2. Navigate to the MVP page
3. Select "Option 1: Schedule a 15-minute Meeting"
4. The Calendly booking widget should appear
5. Test booking a meeting
6. Check your Google Calendar - it should show the meeting with a Google Meet link

## Troubleshooting

### Widget Not Showing
- Make sure the Calendly link is correct in `constants.ts`
- Check browser console for errors
- Verify the Calendly link works when opened directly

### Google Meet Links Not Appearing
- Ensure Google Calendar is connected in Calendly
- Check that "Google Meet" is selected as the location in your event type
- Verify your Google account has access to Google Meet

### Widget Loading Slowly
- This is normal for the first load as it fetches from Calendly
- The widget is cached after the first load

## Advanced Features (Optional)

### Custom Branding
- Go to Calendly → Settings → Appearance
- Customize colors, logo, and styling to match your brand

### Automated Reminders
- Calendly automatically sends email reminders
- Configure reminder times in Event Type settings

### Webhooks (For Backend Integration)
- If you want to receive booking notifications in your backend:
  - Go to Calendly → Settings → Integrations → Webhooks
  - Add webhook URL: `https://your-backend.railway.app/api/meetings/webhook`
  - Select events: "invitee.created", "invitee.canceled"

## Benefits

✅ **Automatic Google Meet Links** - No manual setup needed for each meeting
✅ **Calendar Integration** - Bookings automatically appear in your Google Calendar
✅ **Email Notifications** - Both you and the client receive confirmations
✅ **Time Zone Handling** - Calendly automatically handles time zone conversions
✅ **Professional Interface** - Clean, embeddable widget on your site

## Support

If you need help:
- [Calendly Support](https://help.calendly.com/)
- [Calendly + Google Meet Guide](https://help.calendly.com/hc/en-us/articles/223147027)

