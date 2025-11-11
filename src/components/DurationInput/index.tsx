import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DurationInputProps {
  duration: string;
  durationUnit: "days" | "weeks" | "months";
  setDuration: (value: string) => void;
  setDurationUnit: (value: "days" | "weeks" | "months") => void;
  handleIntegerInput: (value: string, setter: (val: string) => void) => void;
}

export default function DurationInput({
  duration,
  durationUnit,
  setDuration,
  setDurationUnit,
  handleIntegerInput,
}: DurationInputProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold text-foreground">
        Stream Duration
      </Label>
      <div className="flex space-x-3">
        <Input
          type="text"
          value={duration}
          onChange={(e) => handleIntegerInput(e.target.value, setDuration)}
          placeholder="1"
          className="flex-1 bw-input-large"
          required
        />
        <Select
          value={durationUnit}
          onValueChange={(value: "days" | "weeks" | "months") =>
            setDurationUnit(value)
          }
        >
          <SelectTrigger className="w-36 bw-input-large">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="days">Days</SelectItem>
            <SelectItem value="weeks">Weeks</SelectItem>
            <SelectItem value="months">Months</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
