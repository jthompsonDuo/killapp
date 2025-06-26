interface ClickData {
  timestamp: string;
  action: 'kill' | 'keep' | 'merge';
  cardId: string;
  cardTitle: string;
  userId: string;
}

class GoogleSheetsTracker {
  private userId: string;
  private scriptUrl: string = '';

  constructor() {
    // Generate or retrieve user ID
    this.userId = this.getUserId();
    // Load saved script URL
    this.scriptUrl = localStorage.getItem('googleScriptUrl') || '';
  }

  private getUserId(): string {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', userId);
    }
    return userId;
  }

  setScriptUrl(url: string) {
    this.scriptUrl = url;
    localStorage.setItem('googleScriptUrl', url);
  }

  getScriptUrl(): string {
    return this.scriptUrl;
  }

  isConfigured(): boolean {
    return this.scriptUrl.length > 0;
  }

  async trackClick(action: 'kill' | 'keep' | 'merge', cardId: string, cardTitle: string) {
    if (!this.isConfigured()) {
      console.warn('⚠️ Google Sheets not configured. Please add your Apps Script URL.');
      // Store locally as backup
      this.storeLocallyAsBackup({
        timestamp: new Date().toISOString(),
        action,
        cardId,
        cardTitle,
        userId: this.userId
      });
      return;
    }

    const data: ClickData = {
      timestamp: new Date().toISOString(),
      action,
      cardId,
      cardTitle,
      userId: this.userId
    };

    try {
      // Send to Google Sheets
      const response = await fetch(this.scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      console.log('✅ Data sent to Google Sheets:', data);
      
      // Also store locally as backup
      this.storeLocallyAsBackup(data);
      
    } catch (error) {
      console.error('❌ Failed to send to Google Sheets:', error);
      // Store locally if Google Sheets fails
      this.storeLocallyAsBackup(data);
    }
  }

  private storeLocallyAsBackup(data: ClickData) {
    const existingData = JSON.parse(localStorage.getItem('clickData') || '[]');
    existingData.push(data);
    localStorage.setItem('clickData', JSON.stringify(existingData));
  }

  exportLocalData() {
    const data = localStorage.getItem('clickData');
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `click-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      alert('No local data to export');
    }
  }

  getLocalDataCount(): number {
    const data = localStorage.getItem('clickData');
    return data ? JSON.parse(data).length : 0;
  }
}

export const googleSheetsTracker = new GoogleSheetsTracker();