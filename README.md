# Kill, Keep, or Merge - Decision Tracking App

A card-based web application for making quick decisions on projects, features, or ideas. Track your choices with multiple analytics options.

## 🚀 Quick Start

### Option 1: Deploy to Netlify (Easiest)

1. **Download the code** from Figma Make (Export button or GitHub integration)
2. **Drag and drop** the project folder to [netlify.com/drop](https://netlify.com/drop)
3. **Done!** Your app is live

### Option 2: Deploy via GitHub

1. **Push code to GitHub** (use Figma Make's GitHub integration if available)
2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repo
   - Build settings: Build command: `npm run build`, Publish directory: `dist`
   - Deploy!

### Option 3: Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📊 Analytics Setup

The app supports multiple tracking methods:

### 1. Console Log (Default)
- Open browser DevTools (F12) → Console
- Click cards to see tracking data
- Perfect for testing

### 2. Google Sheets
- Most popular option for data storage
- Follow the setup guide in the app
- Real-time data tracking

### 3. Webhook
- Send data to Zapier, Make.com, etc.
- Great for automation

### 4. Email Notifications
- Get emailed when actions occur
- Requires EmailJS setup

## 🛠️ Google Sheets Setup

1. **Create Google Sheet:**
   - Go to [sheets.google.com](https://sheets.google.com)
   - Add headers: Timestamp, Action, Card ID, Card Title, User ID

2. **Apps Script:**
   - Extensions → Apps Script
   - Paste the provided code
   - Deploy as Web app (Execute as: Me, Access: Anyone)

3. **Connect:**
   - Copy the Apps Script URL
   - Paste in your app's Google Sheets setup

## 🔧 Customization

- **Cards:** Edit `initialCards` array in `App.tsx`
- **Styling:** Modify `styles/globals.css`
- **Tracking:** Add new methods in `services/`

## 📁 Project Structure

```
├── App.tsx                 # Main app component
├── components/
│   ├── CardItem.tsx       # Individual card component
│   ├── TallyDisplay.tsx   # Score counter
│   └── SetupInstructions.tsx
├── services/
│   ├── google-sheets-tracker.ts
│   └── analytics-tracker.ts
└── styles/
    └── globals.css        # Tailwind + custom styles
```

## 🎯 Features

- ✅ Card-based decision making
- ✅ Real-time tally tracking
- ✅ Multiple analytics options
- ✅ Mobile responsive
- ✅ Local data backup
- ✅ Easy deployment
- ✅ No database required

## 🤝 Need Help?

- Check the Google Sheets setup guide in the app
- View console logs for debugging
- Export local data as backup

Built with React, TypeScript, and Tailwind CSS v4.