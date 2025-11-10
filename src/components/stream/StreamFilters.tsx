import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';

type SortOption = 'newest' | 'oldest' | 'amount-high' | 'amount-low' | 'progress';
type FilterStatus = 'all' | 'active' | 'completed' | 'pending';
type TabType = 'all' | 'sent' | 'received';

interface StreamCounts {
  total: number;
  sent: number;
  received: number;
  active: number;
  completed: number;
}

interface StreamFiltersProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  filterStatus: FilterStatus;
  onFilterStatusChange: (status: FilterStatus) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: StreamCounts;
  showFilters?: boolean;
}

export const StreamFilters = ({
  activeTab,
  onTabChange,
  sortBy,
  onSortChange,
  filterStatus,
  onFilterStatusChange,
  searchQuery,
  onSearchChange,
  counts,
  showFilters = true,
}) => {
  return (
    <div className="space-y-4">
      {/* Main Tabs */}
      <div className="flex justify-center">
        <div className="flex bg-secondary/50 rounded-xl p-1.5 gap-1">
          <button
            onClick={() => onTabChange('all')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'all' 
                ? 'bg-white dark:bg-gray-800 text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All Streams {counts.total > 0 && `(${counts.total})`}
          </button>
          <button
            onClick={() => onTabChange('sent')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'sent' 
                ? 'bg-white dark:bg-gray-800 text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="flex items-center space-x-2">
              <span>Outgoing</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              {counts.sent > 0 && <span>({counts.sent})</span>}
            </span>
          </button>
          <button
            onClick={() => onTabChange('received')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'received' 
                ? 'bg-white dark:bg-gray-800 text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="flex items-center space-x-2">
              <span>Incoming</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
              {counts.received > 0 && <span>({counts.received})</span>}
            </span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mx-auto">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input
              type="text"
              placeholder="Search streams by ID, address, or token..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full !pl-10 pr-4 bw-input h-10 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className='flex gap-4'>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Select value={filterStatus} onValueChange={(value) => onFilterStatusChange(value as FilterStatus)}>
              <SelectTrigger className="w-[140px] !h-9 bw-input-large">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Active</span>
                  </div>
                </SelectItem>
                <SelectItem value="completed">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Completed</span>
                  </div>
                </SelectItem>
                <SelectItem value="pending">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Pending</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort:</span>
            <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
              <SelectTrigger className="w-[160px] w-60 !h-9 bw-input-large">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">
                  <div className="flex items-center space-x-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Newest First</span>
                  </div>
                </SelectItem>
                <SelectItem value="oldest">
                  <div className="flex items-center space-x-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Oldest First</span>
                  </div>
                </SelectItem>
                <SelectItem value="amount-high">
                  <div className="flex items-center space-x-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                    <span>Highest Amount</span>
                  </div>
                </SelectItem>
                <SelectItem value="amount-low">
                  <div className="flex items-center space-x-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    </svg>
                    <span>Lowest Amount</span>
                  </div>
                </SelectItem>
                <SelectItem value="progress">
                  <div className="flex items-center space-x-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>By Progress</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
         </div>
        </div>
      )}
    </div>
  );
};
