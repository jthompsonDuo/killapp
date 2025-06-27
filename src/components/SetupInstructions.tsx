import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";

interface SetupInstructionsProps {
  onUrlUpdate: (url: string) => void;
}

export function SetupInstructions({ onUrlUpdate }: SetupInstructionsProps) {
  const [scriptUrl, setScriptUrl] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

  const handleSaveUrl = () => {
    if (scriptUrl.trim()) {
      onUrlUpdate(scriptUrl.trim());
      alert('Google Apps Script URL saved! You can now test the Google Sheets tracking.');
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Google Sheets Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block mb-2">Google Apps Script URL:</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={scriptUrl}
              onChange={(e) => setScriptUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/[SCRIPT_ID]/exec"
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <Button onClick={handleSaveUrl} size="sm">
              Save URL
            </Button>
          </div>
        </div>

        <Button 
          variant="outline" 
          onClick={() => setShowInstructions(!showInstructions)}
        >
          {showInstructions ? 'Hide' : 'Show'} Setup Instructions
        </Button>

        {showInstructions && (
          <div className="text-sm space-y-3 bg-muted p-4 rounded-lg">
            <div>
              <h4 className="font-medium mb-2">Step 1: Create Google Sheet</h4>
              <p>1. Go to sheets.google.com</p>
              <p>2. Create new spreadsheet</p>
              <p>3. Add headers: Timestamp, Action, Card ID, Card Title, User ID</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Step 2: Apps Script</h4>
              <p>1. Extensions → Apps Script</p>
              <p>2. Replace code with the doPost function</p>
              <p>3. Deploy → New deployment → Web app</p>
              <p>4. Execute as: Me, Access: Anyone</p>
              <p>5. Copy the web app URL and paste it above</p>
            </div>

            <div className="bg-background p-3 rounded border">
              <h4 className="font-medium mb-2">Apps Script Code:</h4>
              <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
{`function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp,
      data.action,
      data.cardId,
      data.cardTitle,
      data.userId
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}