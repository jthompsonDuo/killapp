import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface CardItemProps {
  id: string;
  title: string;
  subtitle: string;
  onAction: (id: string, action: 'kill' | 'keep' | 'merge') => void;
}

export function CardItem({ id, title, subtitle, onAction }: CardItemProps) {
  return (
    <Card className="w-full max-w-sm transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 justify-between">
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => onAction(id, 'kill')}
            className="flex-1"
          >
            Kill
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={() => onAction(id, 'keep')}
            className="flex-1"
          >
            Keep
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => onAction(id, 'merge')}
            className="flex-1"
          >
            Merge
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}