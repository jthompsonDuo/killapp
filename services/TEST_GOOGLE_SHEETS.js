// 🧪 TEST SCRIPT: Add this to browser console to test Google Sheets
// Paste this in your browser console (F12 → Console) to test the connection

console.log('🧪 Testing Google Sheets connection...');

// Get the current script URL
const currentUrl = window.googleSheetsTracker?.getScriptUrl();
console.log('📍 Current Script URL:', currentUrl);

// Check if configured
const isConfigured = window.googleSheetsTracker?.isConfigured();
console.log('✅ Is Configured?', isConfigured);

// Test data
const testData = {
  timestamp: new Date().toISOString(),
  action: 'test',
  cardId: 'test-card-123',
  cardTitle: 'Test Card from Console',
  userId: 'test-user'
};

if (isConfigured) {
  console.log('🚀 Sending test data to Google Sheets...');
  
  fetch(currentUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testData)
  })
  .then(() => {
    console.log('✅ Test data sent successfully!', testData);
    console.log('📊 Check your Google Sheet for the test entry');
  })
  .catch(error => {
    console.error('❌ Test failed:', error);
  });
} else {
  console.log('⚠️ Not configured yet. Update your Script ID in /services/google-sheets-tracker.ts');
}