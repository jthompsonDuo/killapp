# Google Sheets Tracking Setup

Follow these steps to track clicks in a Google Sheet:

## Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Add these column headers in row 1:
   - A1: Timestamp
   - B1: Action
   - C1: Card ID
   - D1: Card Title
   - E1: User ID

## Step 2: Create Google Apps Script
1. In your Google Sheet, go to **Extensions > Apps Script**
2. Replace the default code with this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add new row with the data
    sheet.appendRow([
      data.timestamp,
      data.action,
      data.cardId,
      data.cardTitle,
      data.userId
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 3: Deploy the Script
1. Click **Deploy > New Deployment**
2. Choose type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click **Deploy**
6. Copy the web app URL

## Step 4: Update Your App
1. Open `/services/google-sheets-tracker.ts`
2. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your web app URL
3. Deploy your app to Netlify

## Step 5: Test
1. Click some cards in your app
2. Check your Google Sheet - you should see the data appearing!

## Alternative: Simple Webhook Options
- **Zapier**: Create a webhook trigger that writes to Google Sheets
- **Make.com**: Similar to Zapier, free tier available
- **n8n**: Self-hosted automation tool