# 📝 Example: How to Replace the Script ID

## Step-by-Step Example:

### 1. Your Google Apps Script URL looks like:
```
https://script.google.com/d/1BcD3fG4HiJ5kL6mN7oP8qR9sT0uV1wX2yZ/edit
```

### 2. Extract the Script ID:
The part between `/d/` and `/edit`:
```
1BcD3fG4HiJ5kL6mN7oP8qR9sT0uV1wX2yZ
```

### 3. Edit `/services/google-sheets-tracker.ts` line 11:

**BEFORE:**
```typescript
private scriptUrl: string = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID_HERE/exec';
```

**AFTER:**
```typescript
private scriptUrl: string = 'https://script.google.com/macros/s/1BcD3fG4HiJ5kL6mN7oP8qR9sT0uV1wX2yZ/exec';
```

### 4. Save the file and test!

## 🚨 Important: 
- Only edit the ROOT level file: `/services/google-sheets-tracker.ts`
- Don't edit: `/src/services/google-sheets-tracker.ts` (that's the unused duplicate)

## 🎉 Result:
Your app will immediately start sending data to Google Sheets without requiring users to enter any URL!