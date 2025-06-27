interface AnalyticsEvent {
  action: 'kill' | 'keep' | 'merge';
  cardId: string;
  cardTitle: string;
}

class AnalyticsTracker {
  private userId: string;

  constructor() {
    this.userId = this.getUserId();
  }

  private getUserId(): string {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', userId);
    }
    return userId;
  }

  // Method 1: Google Analytics (if you have GA set up)
  trackWithGoogleAnalytics(event: AnalyticsEvent) {
    // If you have Google Analytics installed, you can track custom events
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'card_action', {
        event_category: 'engagement',
        event_label: event.cardTitle,
        custom_parameter_action: event.action,
        custom_parameter_card_id: event.cardId,
        custom_parameter_user_id: this.userId
      });
    }
  }

  // Method 2: Simple webhook (you can use services like Zapier, Make.com, or n8n)
  async trackWithWebhook(event: AnalyticsEvent) {
    const webhookUrl = 'YOUR_WEBHOOK_URL_HERE'; // Replace with your webhook URL
    
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          userId: this.userId,
          ...event
        })
      });
      console.log('✅ Event sent to webhook:', event);
    } catch (error) {
      console.error('❌ Failed to send to webhook:', error);
    }
  }

  // Method 3: Email notification (using a service like EmailJS)
  async trackWithEmail(event: AnalyticsEvent) {
    // This is a simplified example - you'd need to set up EmailJS
    const emailData = {
      to_email: 'your-email@example.com',
      subject: 'New Card Action',
      message: `User ${this.userId} performed action "${event.action}" on card "${event.cardTitle}" at ${new Date().toISOString()}`
    };
    
    console.log('📧 Would send email:', emailData);
    // Implementation would depend on your email service
  }

  // Method 4: Browser console logging (for testing)
  trackToConsole(event: AnalyticsEvent) {
    console.log('📊 TRACKING EVENT:', {
      timestamp: new Date().toISOString(),
      userId: this.userId,
      ...event
    });
  }
}

export const analyticsTracker = new AnalyticsTracker();