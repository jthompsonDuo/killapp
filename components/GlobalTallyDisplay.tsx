import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";

interface GlobalTallyDisplayProps {
  userTallies: {
    kill: number;
    keep: number;
    merge: number;
  };
}

interface GlobalTallies {
  kill: number;
  keep: number;
  merge: number;
  totalUsers: number;
}

export function GlobalTallyDisplay({ userTallies }: GlobalTallyDisplayProps) {
  const [globalTallies, setGlobalTallies] = useState<GlobalTallies>({
    kill: 0,
    keep: 0,
    merge: 0,
    totalUsers: 0
  });

  // Mock function - replace with actual Supabase call
  const fetchGlobalTallies = async () => {
    // This would be your actual Supabase query
    // const { data } = await supabase.from('user_actions').select('*')
    
    // Mock data for demonstration
    const mockGlobalData = {
      kill: 45,
      keep: 32,
      merge: 28,
      totalUsers: 23
    };
    
    setGlobalTallies(mockGlobalData);
  };

  useEffect(() => {
    fetchGlobalTallies();
    // Refresh every 30 seconds to show live updates
    const interval = setInterval(fetchGlobalTallies, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Tallies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-destructive/10 rounded-lg">
              <div className="text-destructive">Kill</div>
              <div className="text-2xl font-medium">{userTallies.kill}</div>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <div className="text-primary">Keep</div>
              <div className="text-2xl font-medium">{userTallies.keep}</div>
            </div>
            <div className="p-3 bg-secondary/50 rounded-lg">
              <div className="text-secondary-foreground">Merge</div>
              <div className="text-2xl font-medium">{userTallies.merge}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Global Tallies</CardTitle>
          <p className="text-sm text-muted-foreground">From all {globalTallies.totalUsers} users</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-destructive/10 rounded-lg">
              <div className="text-destructive">Kill</div>
              <div className="text-2xl font-medium">{globalTallies.kill}</div>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <div className="text-primary">Keep</div>
              <div className="text-2xl font-medium">{globalTallies.keep}</div>
            </div>
            <div className="p-3 bg-secondary/50 rounded-lg">
              <div className="text-secondary-foreground">Merge</div>
              <div className="text-2xl font-medium">{globalTallies.merge}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}