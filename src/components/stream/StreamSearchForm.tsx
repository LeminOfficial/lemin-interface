import React from 'react';
import { Input } from '../ui/input';

interface StreamSearchFormProps {
  streamId: string;
  isSearching: boolean;
  onStreamIdChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const StreamSearchForm = ({
  streamId,
  isSearching,
  onStreamIdChange,
  onSubmit,
}: StreamSearchFormProps) => {
  return (
    <div className="mx-auto">
      <div className="bw-card p-6 bg-gradient-to-br from-primary/5 to-accent/5 border border-accent/20">
        <div className="space-y-4">
          <div className="text-center flex gap-2">
            <div className="inline-flex items-center justify-center w-12 h-12 !bg-primary/10 rounded-lg">
              <svg
                className="w-6 h-6 bw-text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Find Your Stream
              </h3>
              <p className="text-sm text-muted-foreground">
                Enter the unique stream identifier
              </p>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="flex row-reverse justify-between px-1 items-center gap-4 w-full"
          >
            <div className="w-full flex flex-col justify-center items-start">
              <Input
                type="text"
                value={streamId}
                onChange={(e) => {
                  const integerValue = e.target.value.replace(/[^0-9]/g, '');
                  onStreamIdChange(integerValue);
                }}
                placeholder="e.g. 12345"
                className="text-lg bw-input-large w-full"
              />
            </div>

            <button
              type="submit"
              disabled={isSearching || !streamId.trim()}
              className=" bw-button-primary !w-[20%] text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span>Find Stream</span>
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
