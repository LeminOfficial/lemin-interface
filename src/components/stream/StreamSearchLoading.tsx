import React from 'react';

export const StreamSearchLoading = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Searching Stream</h3>
        <p className="text-muted-foreground">Loading stream details...</p>
      </div>
    </div>
  );
};