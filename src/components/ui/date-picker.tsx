import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/utils/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

interface DatePickerProps {
  value: string; // ISO string for datetime-local
  onChange: (value: string) => void;
  label?: string;
  min?: string;
  max?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}

export function DatePicker({
  value,
  onChange,
  label,
  min,
  max,
  required,
  error,
  helperText,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value.split('T')[0]) : undefined,
  );
  const [time, setTime] = React.useState<string>(
    value ? value.split('T')[1] || '00:00' : '00:00',
  );

  React.useEffect(() => {
    if (value) {
      const datePart = value.split('T')[0];
      const timePart = value.split('T')[1] || '00:00';
      setDate(new Date(datePart));
      setTime(timePart);
    }
  }, [value]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      const isoDate = selectedDate.toISOString().split('T')[0];
      onChange(`${isoDate}T${time}`);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);
    if (date) {
      const isoDate = date.toISOString().split('T')[0];
      onChange(`${isoDate}T${newTime}`);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              error && 'border-destructive',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
            {time && time !== '00:00' && <span className="ml-2">{time}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={(date) => {
              if (min && date < new Date(min.split('T')[0])) return true;
              if (max && date > new Date(max.split('T')[0])) return true;
              return false;
            }}
            initialFocus
          />
          <div className="p-3 border-t">
            <label
              htmlFor="time-input"
              className="block text-sm font-medium mb-2"
            >
              Time
            </label>
            <Input
              id="time-input"
              type="time"
              value={time}
              onChange={handleTimeChange}
              className="w-full"
            />
          </div>
        </PopoverContent>
      </Popover>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      {helperText && !error && (
        <p className="mt-2 text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
