import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DateTimePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export const DateTimePicker = ({
  value,
  onChange,
  placeholder = 'Pick a date and time',
  className,
}: DateTimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeValue, setTimeValue] = useState(
    value ? format(value, 'HH:mm') : '12:00',
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Combine selected date with current time
      const [hours, minutes] = timeValue.split(':');
      const newDate = new Date(selectedDate);
      newDate.setHours(parseInt(hours), parseInt(minutes));
      onChange(newDate);
    }
  };

  const handleTimeChange = (time: string) => {
    setTimeValue(time);
    if (value) {
      const [hours, minutes] = time.split(':');
      const newDate = new Date(value);
      newDate.setHours(parseInt(hours), parseInt(minutes));
      onChange(newDate);
    }
  };

  const formatDisplayDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      hour12: true,
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'w-full h-[52px] justify-between text-left font-normal bg-gray-50 dark:bg-gray-900/20 !border-2 !border-solid !border-input dark:!border-gray-600 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg px-4 py-3 transition-all duration-200 shadow-sm hover:border-primary/50 hover:bg-secondary/50 focus:outline-none cursor-pointer flex items-center',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          <div className="flex items-center space-x-3">
            <div className="p-1 bg-primary/10 rounded">
              <CalendarIcon className="h-4 w-4 bw-text-accent" />
            </div>
            <span>{value ? formatDisplayDate(value) : placeholder}</span>
          </div>
          <svg
            className="h-5 w-5 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bw-card bw-shadow-md" align="start">
        <div className="p-4 space-y-4">
          {/* Date Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4" />
              <span>Select Date</span>
            </Label>
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleDateSelect}
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
              initialFocus
              className="rounded-md border"
            />
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Select Time</span>
            </Label>
            <Input
              type="time"
              value={timeValue}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="bw-input"
            />
          </div>

          {/* Preview */}
          {value && (
            <div className="p-3 bg-primary/5 rounded-lg bw-border-accent">
              <div className="text-xs text-muted-foreground mb-1">
                Selected Date & Time
              </div>
              <div className="text-sm font-semibold bw-text-accent">
                {formatDisplayDate(value)}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
