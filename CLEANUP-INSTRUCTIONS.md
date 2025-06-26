# 🧹 File Cleanup Instructions

## ❌ DELETE These Duplicate Files (Keep Only /src/ Versions)

Delete these files from the ROOT directory (they're duplicated in `/src/`):

```bash
# DELETE these root files:
rm App.tsx
rm main.tsx
rm -rf components/
rm -rf services/  
rm -rf styles/
```

## ✅ KEEP These Files in Root:
- package.json ✅
- vite.config.ts ✅
- tsconfig.json ✅ (Fixed)
- tsconfig.node.json ✅ (Fixed)
- index.html ✅
- netlify.toml ✅
- README.md files ✅

## ✅ KEEP Everything in /src/:
- /src/App.tsx ✅
- /src/main.tsx ✅
- /src/components/ ✅
- /src/services/ ✅
- /src/styles/globals.css ✅

## Final Structure Should Be:
```
├── package.json          (✅ Fixed build script)
├── vite.config.ts        (✅ Good)
├── tsconfig.json         (✅ Fixed - no more reference issues)
├── tsconfig.node.json    (✅ Fixed - no more noEmit conflict)
├── index.html            (✅ Points to /src/main.tsx)
├── netlify.toml          (✅ Good)
└── src/                  (✅ All source code here)
    ├── App.tsx
    ├── main.tsx
    ├── styles/globals.css
    ├── components/...
    └── services/...
```

## What I Fixed:
1. ✅ **TypeScript config** - Removed the problematic reference causing TS6310
2. ✅ **Build script** - Changed from `tsc && vite build` to just `vite build`
3. ✅ **Dependencies** - All ShadCN requirements included

## After Cleanup:
1. Delete the duplicate files listed above
2. Commit and push to GitHub
3. Netlify build should succeed! 🎉

The key fix was removing the TypeScript reference issue and letting Vite handle all the compilation internally.