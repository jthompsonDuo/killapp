#!/bin/bash
# 🚨 URGENT: Fix card layout by removing duplicate files

echo "🧹 Removing duplicate root files that are breaking the layout..."

# Delete root duplicates (keep /src/ versions)
if [ -f "App.tsx" ]; then
    rm App.tsx
    echo "✅ Deleted root App.tsx"
fi

if [ -f "main.tsx" ]; then
    rm main.tsx  
    echo "✅ Deleted root main.tsx"
fi

if [ -d "components" ]; then
    rm -rf components/
    echo "✅ Deleted root components/"
fi

if [ -d "services" ]; then
    rm -rf services/
    echo "✅ Deleted root services/"
fi

if [ -d "styles" ]; then
    rm -rf styles/
    echo "✅ Deleted root styles/"
fi

echo ""
echo "🎉 Fixed! Now restart your dev server:"
echo "npm run dev"
echo ""
echo "📱 Your cards should now display in a proper grid layout!"