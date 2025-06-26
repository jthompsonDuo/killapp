// Mock analytics service - replace with actual Supabase implementation
interface ActionData {
  action: 'kill' | 'keep' | 'merge';
  cardId: string;
  cardTitle: string;
  timestamp: string;
  userId: string;
}

class AnalyticsService {
  private userId: string;

  constructor() {
    // Generate or retrieve user ID
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

  async trackAction(action: 'kill' | 'keep' | 'merge', cardId: string, cardTitle: string) {
    const actionData: ActionData = {
      action,
      cardId,
      cardTitle,
      timestamp: new Date().toISOString(),
      userId: this.userId
    };

    // In a real implementation, this would be:
    // await supabase.from('user_actions').insert(actionData)
    
    // Mock implementation - just log to console
    console.log('📊 Action tracked:', actionData);
    
    // Store locally for demo purposes
    const existingData = JSON.parse(localStorage.getItem('analyticsData') || '[]');
    existingData.push(actionData);
    localStorage.setItem('analyticsData', JSON.stringify(existingData));

    return actionData;
  }

  async getGlobalTallies() {
    // In a real implementation, this would be:
    // const { data } = await supabase.from('user_actions').select('action')
    // return aggregated counts
    
    // Mock implementation
    const mockData = {
      kill: Math.floor(Math.random() * 100) + 20,
      keep: Math.floor(Math.random() * 80) + 15,
      merge: Math.floor(Math.random() * 60) + 10,
      totalUsers: Math.floor(Math.random() * 50) + 10
    };
    
    return mockData;
  }

  getLocalAnalytics() {
    return JSON.parse(localStorage.getItem('analyticsData') || '[]');
  }
}

export const analytics = new AnalyticsService();