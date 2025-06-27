@echo off
REM 🚨 URGENT: Fix card layout by removing duplicate files (Windows)

echo 🧹 Removing duplicate root files that are breaking the layout...

REM Delete root duplicates (keep /src/ versions)
if exist App.tsx (
    del App.tsx
    echo ✅ Deleted root App.tsx
)

if exist main.tsx (
    del main.tsx
    echo ✅ Deleted root main.tsx
)

if exist components (
    rmdir /s /q components
    echo ✅ Deleted root components/
)

if exist services (
    rmdir /s /q services
    echo ✅ Deleted root services/
)

if exist styles (
    rmdir /s /q styles
    echo ✅ Deleted root styles/
)

echo.
echo 🎉 Fixed! Now restart your dev server:
echo npm run dev
echo.
echo 📱 Your cards should now display in a proper grid layout!
pause