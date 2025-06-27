#!/bin/bash
# 🚨 CRITICAL: Delete these duplicate root files NOW!

echo "🧹 Removing duplicate root files..."

# Delete root duplicates (keep /src/ versions)
rm -f App.tsx
rm -f main.tsx
rm -rf components/
rm -rf services/
rm -rf styles/

echo "✅ Deleted root duplicates!"
echo ""
echo "📁 Your structure should now be:"
echo "├── package.json ✅"
echo "├── vite.config.ts ✅" 
echo "├── tsconfig.json ✅"
echo "├── index.html ✅"
echo "├── netlify.toml ✅"
echo "└── src/ ✅ (ALL source code)"
echo "    ├── App.tsx"
echo "    ├── main.tsx"
echo "    ├── components/"
echo "    ├── services/"
echo "    └── styles/globals.css"
echo ""
echo "🚀 Now commit and push to GitHub!"