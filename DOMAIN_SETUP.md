# 🌐 Domain Setup Guide - youraibuddy.in

## Overview
This guide will help you connect your GoDaddy domain `www.youraibuddy.in` to your Vercel deployment.

## Step 1: Connect Domain to Vercel

### In Vercel Dashboard:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `ai-tools-navigator`
3. Go to **Settings** → **Domains**
4. Click **"Add Domain"**
5. Enter: `www.youraibuddy.in`
6. Also add: `youraibuddy.in` (without www)
7. Vercel will show DNS configuration instructions

## Step 2: Update DNS in GoDaddy

### In GoDaddy Dashboard:
1. Log in to [GoDaddy](https://godaddy.com)
2. Go to **My Products** → **Domains**
3. Click **"DNS"** next to `youraibuddy.in`
4. You'll see DNS records - update/add these:

### For Root Domain (youraibuddy.in):
**Option A - Use CNAME (Recommended):**
- **Type**: `CNAME`
- **Name**: `@` (or leave blank)
- **Value**: `cname.vercel-dns.com`
- **TTL**: `600` (10 minutes)

**Option B - Use A Record (if CNAME doesn't work):**
- **Type**: `A`
- **Name**: `@` (or leave blank)
- **Value**: `76.76.21.21`
- **TTL**: `600`

### For www Subdomain (www.youraibuddy.in):
- **Type**: `CNAME`
- **Name**: `www`
- **Value**: `cname.vercel-dns.com`
- **TTL**: `600`

## Step 3: Update Backend Environment Variable

### In Railway Dashboard:
1. Go to Railway → Your Service → **Settings** → **Variables**
2. Find `FRONTEND_URL` or add it:
   - **Variable Name**: `FRONTEND_URL`
   - **Variable Value**: `https://www.youraibuddy.in`
3. Save (Railway will redeploy automatically)

## Step 4: Wait for DNS Propagation

- **Usually takes**: 5-60 minutes
- **Maximum**: 24 hours (rare)
- **Check status**: [dnschecker.org](https://dnschecker.org)
- Enter your domain and check if `cname.vercel-dns.com` appears

## Step 5: Verify Domain in Vercel

1. Go back to Vercel → Settings → Domains
2. You should see:
   - ✅ `www.youraibuddy.in` - Valid Configuration
   - ✅ `youraibuddy.in` - Valid Configuration

## Step 6: Test Your Site

1. Visit: `https://www.youraibuddy.in`
2. Visit: `https://youraibuddy.in`
3. Both should work and show your site
4. Test form submission and payment

## Troubleshooting

### Domain Not Working
- Wait 30-60 minutes for DNS propagation
- Clear browser cache
- Check DNS with [dnschecker.org](https://dnschecker.org)
- Verify DNS records in GoDaddy match Vercel's requirements

### SSL Certificate Issues
- Vercel automatically provides SSL certificates
- May take a few minutes after DNS propagation
- If "Not Secure" appears, wait 5-10 minutes

### Backend Not Working
- Verify `FRONTEND_URL` is set in Railway
- Check CORS errors in browser console
- Ensure domain matches exactly (with/without www)

## Redirect Setup (Optional)

To redirect `youraibuddy.in` → `www.youraibuddy.in`:
- GoDaddy → DNS → Add redirect rule
- Or configure in Vercel → Settings → Domains → Configure

## What's Updated

✅ Backend CORS settings updated
✅ Code ready for new domain
✅ Environment variable template updated

## Next Steps

1. **Connect domain in Vercel** (Step 1)
2. **Update DNS in GoDaddy** (Step 2)
3. **Update Railway environment variable** (Step 3)
4. **Wait for DNS propagation** (Step 4)
5. **Test your site** (Step 6)

Your site will be live at `https://www.youraibuddy.in`! 🚀

