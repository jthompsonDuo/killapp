import { useState } from 'react';
import { CardItem } from './components/CardItem';
import { TallyDisplay } from './components/TallyDisplay';
import { googleSheetsTracker } from './services/google-sheets-tracker';
import { Button } from './components/ui/button';

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

  const handleAction = async (cardId: string, action: 'kill' | 'keep' | 'merge') => {
    const card = cards.find(c => c.id === cardId);
    if (!card) return;

    // Always track with Google Sheets (no user choice needed)
    await googleSheetsTracker.trackClick(action, cardId, card.title);

    // Remove the card
    setCards(prevCards => prevCards.filter(card => card.id !== cardId));
    
    // Update tallies
    setTallies(prevTallies => ({
      ...prevTallies,
      [action]: prevTallies[action] + 1
    }));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="mb-2">Kill, Keep, or Merge</h1>
          <p className="text-muted-foreground">
            Review each project and decide its fate. Click an action to make your choice.
          </p>
          {!googleSheetsTracker.isConfigured() && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-md mx-auto">
              <p className="text-amber-800 text-sm">
                ⚠️ Google Sheets tracking not configured. Data will be stored locally only.
              </p>
            </div>
          )}
        </div>

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
              You've made decisions on all projects.
              {googleSheetsTracker.isConfigured() && ' Check your Google Sheet to see the data.'}
            </p>
            
            {googleSheetsTracker.isConfigured() && (
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
            
            <div className="flex gap-2 justify-center flex-wrap">
              <Button 
                onClick={() => {
                  setCards(initialCards);
                  setTallies({ kill: 0, keep: 0, merge: 0 });
                }}
              >
                Reset Cards
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => googleSheetsTracker.exportLocalData()}
              >
                Export Local Data ({googleSheetsTracker.getLocalDataCount()})
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}