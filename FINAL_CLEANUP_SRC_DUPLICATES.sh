#!/bin/bash
# 🧹 Delete /src/ duplicates since you're using ROOT level files

echo "🚨 FOUND THE ISSUE! You have duplicate files!"
echo ""
echo "Your App.tsx imports from ROOT level:"
echo "  ✅ './services/google-sheets-tracker' (ROOT level /services/)"
echo "  ✅ './components/CardItem' (ROOT level /components/)"
echo ""
echo "But you also have unused duplicates in /src/:"
echo "  ❌ /src/services/google-sheets-tracker.ts (NOT USED)"
echo "  ❌ /src/components/ (NOT USED)"
echo ""
echo "🗑️ Deleting unused /src/ duplicates..."

if [ -d "src" ]; then
    rm -rf src/
    echo "✅ Deleted entire /src/ directory"
    echo ""
    echo "🎉 Now your file structure is clean!"
    echo "✅ App.tsx (ROOT) - your main app"
    echo "✅ services/ (ROOT) - contains google-sheets-tracker.ts ← EDIT THIS ONE"
    echo "✅ components/ (ROOT) - contains your components"
    echo "✅ styles/ (ROOT) - contains globals.css"
else
    echo "ℹ️ /src/ directory doesn't exist or already deleted"
fi

echo ""
echo "🔧 TO HARDCODE GOOGLE SHEETS URL:"
echo "1. Edit /services/google-sheets-tracker.ts line 11"
echo "2. Replace 'YOUR_ACTUAL_SCRIPT_ID_HERE' with your real Google Apps Script ID"
echo "3. Save file"
echo "4. Refresh your app"
echo "5. Test Google Sheets tracking!"
echo ""
echo "Example line 11 should look like:"
echo "private scriptUrl: string = 'https://script.google.com/macros/s/AKfycbzXXXXX/exec';"