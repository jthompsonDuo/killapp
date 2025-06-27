import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface TallyDisplayProps {
  tallies: {
    kill: number;
    keep: number;
    merge: number;
  };
}

export function TallyDisplay({ tallies }: TallyDisplayProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center pb-4">
        <CardTitle>Decision Tally</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-destructive">{tallies.kill}</div>
            <div className="text-sm text-muted-foreground">Kill</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{tallies.keep}</div>
            <div className="text-sm text-muted-foreground">Keep</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary-foreground">{tallies.merge}</div>
            <div className="text-sm text-muted-foreground">Merge</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}