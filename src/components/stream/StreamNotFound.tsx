import React from 'react';

interface StreamNotFoundProps {
  streamId: string;
}

export const StreamNotFound = ({ streamId }: StreamNotFoundProps) => {
  return (
    <div className="text-center py-8">
      <div className="bw-card p-8 max-w-md mx-auto">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Stream Not Found</h3>
        <p className="text-muted-foreground mb-4">
          Stream #{streamId} doesn't exist or may have been cancelled.
        </p>
        <div className="text-sm text-muted-foreground">
          <p>• Double-check the stream ID</p>
          <p>• Make sure you're on the correct network</p>
          <p>• Contact the sender if you believe this is an error</p>
        </div>
      </div>
    </div>
  );
};