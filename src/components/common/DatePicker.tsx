import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons';
import { Input } from './Input';
import { format } from 'date-fns';

interface DatePickerProps {
  value: string; // ISO string for datetime-local
  onChange: (value: string) => void;
  label?: string;
  min?: string; // ISO string
  max?: string; // ISO string
  required?: boolean;
  error?: string;
  helperText?: string;
}

export const DatePicker= () => ({
  value,
  onChange,
  label,
  min,
  max,
  required,
  error,
  helperText,
}:DatePickerProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const pickerRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(value.split('T')[0]) : null;
  const selectedTime = value ? value.split('T')[1] : '00:00';

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handleDayClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const isoDate = newDate.toISOString().split('T')[0];
    const newDateTime = `${isoDate}T${selectedTime}`;
    if ((min && new Date(newDateTime) < new Date(min)) || (max && new Date(newDateTime) > new Date(max))) {
        return;
    }
    onChange(newDateTime);
    setShowCalendar(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    if (selectedDate) {
        const newDateTime = `${selectedDate.toISOString().split('T')[0]}T${newTime}`;
        if ((min && new Date(newDateTime) < new Date(min)) || (max && new Date(newDateTime) > new Date(max))) {
            return;
        }
      onChange(newDateTime);
    }
  };

  const renderDays = useCallback(() => {
    const totalDays = daysInMonth(currentMonth);
    const startDay = firstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const isSelected = selectedDate && dayDate.toDateString() === selectedDate.toDateString();
      const isDisabled = 
        (min && dayDate < new Date(min)) ||
        (max && dayDate > new Date(max));

      days.push(
        <button
          key={i}
          onClick={() => !isDisabled && handleDayClick(i)}
          className={`day ${
            isSelected ? 'bg-accent text-inverse font-semibold' : 'text-primary hover:bg-surface-hover'
          } ${isDisabled ? 'text-muted cursor-not-allowed opacity-50' : ''}
          rounded-full w-9 h-9 flex items-center justify-center text-sm transition-colors`}
          disabled={isDisabled}
        >
          {i}
        </button>
      );
    }
    return days;
  }, [currentMonth, selectedDate, min, max, selectedTime, onChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !(pickerRef.current as Node).contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatMonthYear = format(currentMonth, 'MMMM yyyy');

  return (
    <div className="relative w-full" ref={pickerRef}>
      <Input
        label={label}
        type="text"
        value={value ? format(new Date(value), 'PPP p') : ''}
        onFocus={() => setShowCalendar(true)}
        readOnly
        placeholder="Select date and time"
        required={required}
        error={error}
        helperText={helperText}
        className="cursor-pointer"
      />

      {showCalendar && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-surface-primary border border-primary rounded-lg shadow-lg z-20 w-80 animate-fade-in">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
              className="p-1 rounded-full hover:bg-surface-hover text-primary"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <span className="font-semibold text-primary">{formatMonthYear}</span>
            <button 
              onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
              className="p-1 rounded-full hover:bg-surface-hover text-primary"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 text-center text-sm font-medium text-muted mb-2">
            <div className="day-of-week">Su</div>
            <div className="day-of-week">Mo</div>
            <div className="day-of-week">Tu</div>
            <div className="day-of-week">We</div>
            <div className="day-of-week">Th</div>
            <div className="day-of-week">Fr</div>
            <div className="day-of-week">Sa</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {renderDays()}
          </div>

          {/* Time Input */}
          <div className="mt-4 pt-4 border-t border-primary">
            <label htmlFor="time-input" className="block text-sm font-medium text-primary mb-2">Time</label>
            <Input
              id="time-input"
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};
