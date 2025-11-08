import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface StreamingModelSelectorProps {
  streamingModel: string;
  setStreamingModel: (model: string) => void;
}

export default function StreamingModelSelector({
  streamingModel,
  setStreamingModel,
}: StreamingModelSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Label className="text-base font-semibold text-foreground">
          Streaming Model
        </Label>
        <span className="bw-text-accent text-xs bg-secondary px-2 py-1 rounded">
          Linear
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Linear Model */}
        <Card
          className={`cursor-pointer transition-all duration-200 bw-card ${
            streamingModel === 'linear'
              ? '!bg-primary/10 !border-primary/30'
              : 'bw-hover-accent'
          }`}
          onClick={() => setStreamingModel('linear')}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bw-bg-accent rounded-lg">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">Linear</h4>
                <p className="text-xs text-muted-foreground">
                  Constant rate streaming
                </p>
              </div>
              {streamingModel === 'linear' && (
                <div className="w-2 h-2 bw-bg-accent rounded-full"></div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Exponential Model - Coming Soon */}
        <Card className="opacity-50 cursor-not-allowed bw-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-muted rounded-lg">
                <svg
                  className="h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-muted-foreground">Exponential</h4>
                <p className="text-xs text-muted-foreground">Coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
