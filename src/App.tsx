import { useState } from 'react';
import { CardItem } from './components/CardItem';
import { TallyDisplay } from './components/TallyDisplay';
import { SetupInstructions } from './components/SetupInstructions';
import { googleSheetsTracker } from './services/google-sheets-tracker';
import { analyticsTracker } from './services/analytics-tracker';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

interface CardData {
  id: string;
  title: string;
  subtitle: string;
}

const initialCards: CardData[] = [
  {
    id: '1',
    title: 'Project Alpha',
    subtitle: 'Mobile app development initiative'
  },
  {
    id: '2',
    title: 'Marketing Campaign',
    subtitle: 'Q1 social media strategy rollout'
  },
  {
    id: '3',
    title: 'Database Migration',
    subtitle: 'Move from legacy system to cloud'
  },
  {
    id: '4',
    title: 'User Research Study',
    subtitle: 'Understanding customer pain points'
  },
  {
    id: '5',
    title: 'Feature Enhancement',
    subtitle: 'Improve dashboard analytics'
  },
  {
    id: '6',
    title: 'Security Audit',
    subtitle: 'Comprehensive system security review'
  },
  {
    id: '7',
    title: 'Team Training',
    subtitle: 'New technology stack onboarding'
  },
  {
    id: '8',
    title: 'Product Launch',
    subtitle: 'Beta version release preparation'
  }
];

export default function App() {
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [tallies, setTallies] = useState({
    kill: 0,
    keep: 0,
    merge: 0
  });
  const [trackingMethod, setTrackingMethod] = useState<'console' | 'google-sheets' | 'webhook' | 'email'>('console');
  const [showTrackingInfo, setShowTrackingInfo] = useState(false);

  const handleAction = async (cardId: string, action: 'kill' | 'keep' | 'merge') => {
    const card = cards.find(c => c.id === cardId);
    if (!card) return;

    // Track the action based on selected method
    switch (trackingMethod) {
      case 'console':
        analyticsTracker.trackToConsole({ action, cardId, cardTitle: card.title });
        break;
      case 'google-sheets':
        await googleSheetsTracker.trackClick(action, cardId, card.title);
        break;
      case 'webhook':
        await analyticsTracker.trackWithWebhook({ action, cardId, cardTitle: card.title });
        break;
      case 'email':
        await analyticsTracker.trackWithEmail({ action, cardId, cardTitle: card.title });
        break;
    }

    // Remove the card
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));
    
    // Update tallies
    setTallies(prevTallies => ({
      ...prevTallies,
      [action]: prevTallies[action] + 1
    }));
  };

  const handleUrlUpdate = (url: string) => {
    googleSheetsTracker.setScriptUrl(url);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="mb-2">Kill, Keep, or Merge</h1>
          <p className="text-muted-foreground">
            Review each project and decide its fate. Click an action to make your choice.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowTrackingInfo(!showTrackingInfo)}
            className="mt-4"
          >
            {showTrackingInfo ? 'Hide' : 'Show'} Tracking Settings
          </Button>
        </div>

        {showTrackingInfo && (
          <Card className="mb-8 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Tracking Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Choose tracking method:</label>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={trackingMethod === 'console' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTrackingMethod('console')}
                    >
                      Console Log
                    </Button>
                    <Button 
                      variant={trackingMethod === 'google-sheets' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTrackingMethod('google-sheets')}
                    >
                      Google Sheets {googleSheetsTracker.isConfigured() ? '✅' : '⚠️'}
                    </Button>
                    <Button 
                      variant={trackingMethod === 'webhook' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTrackingMethod('webhook')}
                    >
                      Webhook
                    </Button>
                    <Button 
                      variant={trackingMethod === 'email' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setTrackingMethod('email')}
                    >
                      Email
                    </Button>
                  </div>
                </div>

                {trackingMethod === 'google-sheets' && (
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <h4 className="mb-3">Google Sheets Configuration</h4>
                    <SetupInstructions onUrlUpdate={handleUrlUpdate} />
                  </div>
                )}
                
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Console Log:</strong> View clicks in browser developer tools (F12 → Console)</p>
                  <p><strong>Google Sheets:</strong> {googleSheetsTracker.isConfigured() ? 'Ready to track! Data will be sent to your sheet.' : 'Enter your Google Apps Script URL above'}</p>
                  <p><strong>Webhook:</strong> Send to Zapier, Make.com, or custom endpoint</p>
                  <p><strong>Email:</strong> Requires EmailJS or similar service setup</p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => googleSheetsTracker.exportLocalData()}
                  >
                    Export Local Data ({googleSheetsTracker.getLocalDataCount()})
                  </Button>
                  {trackingMethod === 'google-sheets' && googleSheetsTracker.isConfigured() && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const scriptUrl = googleSheetsTracker.getScriptUrl();
                        const sheetUrl = scriptUrl.replace('/macros/s/', '/spreadsheets/d/').replace('/exec', '/edit');
                        window.open(sheetUrl, '_blank');
                      }}
                    >
                      📊 View Google Sheet
                    </Button>
                  )}
                  {trackingMethod === 'console' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        console.log('💡 To see tracking data: Press F12 → Console tab → Click some cards!');
                        alert('Check the browser console (F12 → Console) to see tracking data!');
                      }}
                    >
                      💡 Show Console
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center mb-8">
          <TallyDisplay tallies={tallies} />
        </div>

        {cards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map(card => (
              <CardItem
                key={card.id}
                id={card.id}
                title={card.title}
                subtitle={card.subtitle}
                onAction={handleAction}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="mb-2">All cards processed!</h3>
            <p className="text-muted-foreground mb-4">
              You've made decisions on all projects. Check your tracking method to see the data.
            </p>
            
            {trackingMethod === 'google-sheets' && googleSheetsTracker.isConfigured() && (
              <div className="mb-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const scriptUrl = googleSheetsTracker.getScriptUrl();
                    const sheetUrl = scriptUrl.replace('/macros/s/', '/spreadsheets/d/').replace('/exec', '/edit');
                    window.open(sheetUrl, '_blank');
                  }}
                >
                  📊 View Your Google Sheet Data
                </Button>
              </div>
            )}
            
            <Button 
              onClick={() => {
                setCards(initialCards);
                setTallies({ kill: 0, keep: 0, merge: 0 });
              }}
            >
              Reset Cards
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

