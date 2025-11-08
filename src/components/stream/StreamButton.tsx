import React from 'react';
import { Button } from '../ui/button';

interface StreamButtonProps {
  isValid: boolean;
}

export const StreamButton = ({ isValid }: StreamButtonProps) => (
  <Button
    type="submit"
    form="stream-form"
    disabled={!isValid}
    className="w-full bw-button-primary h-12 text-sm font-semibold"
  >
    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
    Create Stream
  </Button>
);