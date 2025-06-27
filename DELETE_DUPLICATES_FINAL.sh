#!/bin/bash
# 🚨 FINAL FIX: Delete duplicate files that are preventing proper loading

echo "🚨 CRITICAL: You still have duplicate files!"
echo "From your file structure, you have BOTH:"
echo "❌ App.tsx (root) AND src/App.tsx"
echo "❌ main.tsx (root) AND src/main.tsx"  
echo "❌ components/ (root) AND src/components/"
echo "❌ services/ (root) AND src/services/"
echo "❌ styles/ (root) AND src/styles/"
echo ""
echo "🧹 Deleting root duplicates (keeping /src/ versions)..."

# Delete root duplicates
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
echo "🎉 FIXED! Now you have clean structure:"
echo "✅ Only /src/ versions remain"
echo "✅ Tailwind responsive grid classes should work"
echo "✅ Ready for deployment"
echo ""
echo "🔄 Restart your dev server:"
echo "npm run dev"
echo ""
echo "📱 Your responsive grid should now work: md:grid-cols-2, lg:grid-cols-3, etc."