# 🔥 How to Hardcode Your Google Sheets URL

## Quick Instructions:

1. **Replace this line in `/services/google-sheets-tracker.ts` (line 11):**
   ```typescript
   private scriptUrl: string = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec';
   ```

2. **Replace `YOUR_SCRIPT_ID_HERE` with your actual Google Apps Script ID**

   Example:
   ```typescript
   private scriptUrl: string = 'https://script.google.com/macros/s/AKfycbzXXXXXXXXXX/exec';
   ```

## Where to Find Your Script ID:

1. Open your Google Apps Script project
2. Copy the URL - it looks like: `https://script.google.com/d/1ABC123DEFG456HIJK/edit`
3. The Script ID is the part between `/d/` and `/edit`: `1ABC123DEFG456HIJK`
4. Your deployment URL will be: `https://script.google.com/macros/s/1ABC123DEFG456HIJK/exec`

## What This Does:

✅ **Before:** Users must manually enter their Google Sheets URL  
✅ **After:** The URL is pre-configured and works immediately  
✅ **Bonus:** Users can still change it if needed via the UI  

## Example With Real URL:

```typescript
private scriptUrl: string = 'https://script.google.com/macros/s/AKfycbzXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec';
```

## Files to Update:

You need to update **BOTH** files (due to duplicates):
- `/services/google-sheets-tracker.ts` ← Main file
- `/src/services/google-sheets-tracker.ts` ← Duplicate

**After updating, your app will automatically send data to Google Sheets without any user setup required!** 🎉