import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface TallyDisplayProps {
  tallies: {
    kill: number;
    keep: number;
    merge: number;
  };
}

export function TallyDisplay({ tallies }: TallyDisplayProps) {
  return (
    <Card className="w-full max-w-md mb-8">
      <CardHeader>
        <CardTitle>Action Tallies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-destructive/10 rounded-lg">
            <div className="text-destructive">Kill</div>
            <div className="text-2xl font-medium">{tallies.kill}</div>
          </div>
          <div className="p-3 bg-primary/10 rounded-lg">
            <div className="text-primary">Keep</div>
            <div className="text-2xl font-medium">{tallies.keep}</div>
          </div>
          <div className="p-3 bg-secondary/50 rounded-lg">
            <div className="text-secondary-foreground">Merge</div>
            <div className="text-2xl font-medium">{tallies.merge}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}