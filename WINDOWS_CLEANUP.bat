@echo off
REM 🚨 CRITICAL: Delete these duplicate root files NOW! (Windows version)

echo 🧹 Removing duplicate root files...

REM Delete root duplicates (keep /src/ versions)
if exist App.tsx del App.tsx
if exist main.tsx del main.tsx
if exist components rmdir /s /q components
if exist services rmdir /s /q services  
if exist styles rmdir /s /q styles

echo ✅ Deleted root duplicates!
echo.
echo 📁 Your structure should now be:
echo ├── package.json ✅
echo ├── vite.config.ts ✅
echo ├── tsconfig.json ✅
echo ├── index.html ✅
echo ├── netlify.toml ✅
echo └── src/ ✅ (ALL source code)
echo     ├── App.tsx
echo     ├── main.tsx
echo     ├── components/
echo     ├── services/
echo     └── styles/globals.css
echo.
echo 🚀 Now commit and push to GitHub!
pause