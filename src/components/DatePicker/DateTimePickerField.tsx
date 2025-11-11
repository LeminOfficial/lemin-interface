import React from 'react';
import { DateTimePicker } from './DateTimePicker';
import { Label } from '../ui/label';

interface DateTimePickerFieldProps {
  label: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export const DateTimePickerField = ({
  label,
  value,
  onChange,
  placeholder = 'Click to select date and time',
  required = false,
  className = '',
}: DateTimePickerFieldProps) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <Label className="text-base font-semibold text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <DateTimePicker
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-[52px]" // Same height as bw-input-large
      />
    </div>
  );
};
