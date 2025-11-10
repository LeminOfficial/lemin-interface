import React from 'react';

type TabType = 'all' | 'sent' | 'received';

interface EmptyStreamStateProps {
  hasFilters: boolean;
  searchQuery: string;
  activeTab: TabType;
  onCreateStream: () => void;
  onClearFilters: () => void;
}

export const EmptyStreamState = ({
  hasFilters,
  searchQuery,
  activeTab,
  onCreateStream,
  onClearFilters,
}) => {
  return (
    <div className="text-center py-12">
      <div className="bw-card p-8 max-w-md mx-auto">
        <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
          {hasFilters ? (
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          )}
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {hasFilters ? 'No Matching Streams' : 'No Streams Found'}
        </h3>
        <p className="text-muted-foreground mb-4">
          {hasFilters 
            ? "Try adjusting your search or filter criteria."
            : activeTab === 'all' 
              ? "You don't have any streams yet." 
              : `You don't have any ${activeTab === 'sent' ? 'outgoing' : 'incoming'} streams.`
          }
        </p>
        {!hasFilters && (
          <button 
            onClick={onCreateStream}
            className="bw-button-primary px-6 py-2"
          >
            Create Your First Stream
          </button>
        )}
        {hasFilters && (
          <button 
            onClick={onClearFilters}
            className="bw-button-secondary px-6 py-2"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};
