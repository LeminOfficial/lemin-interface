import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CancellableStreamToggleProps {
  cancellable: boolean;
  setCancellable: (value: boolean) => void;
}

export default function CancellableStreamToggle({
  cancellable,
  setCancellable,
}: CancellableStreamToggleProps) {
  return (
    <Card className="bw-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-base font-semibold text-foreground">
              Cancellable Stream
            </Label>
            <p className="text-sm text-muted-foreground">
              Allow stream to be cancelled by sender
            </p>
          </div>
          <Switch checked={cancellable} onCheckedChange={setCancellable} />
        </div>
      </CardContent>
    </Card>
  );
}
