import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  FilterIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChartIcon,
  ListIcon,
} from '../icons';
import type { SortOption, StreamTypeFilter } from '@/types';

interface StreamFilterMenuProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  streamType: StreamTypeFilter;
  onStreamTypeChange: (type: StreamTypeFilter) => void;
}

export const StreamFilterMenu = ({
  sortBy,
  onSortChange,
  streamType,
  onStreamTypeChange,
}: StreamFilterMenuProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2.5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
          <FilterIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-foreground">
            Filter Streams
          </h3>

          {/* Stream Type Filter */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Stream Type
            </label>
            <Select
              value={streamType}
              onValueChange={(v) => onStreamTypeChange(v as StreamTypeFilter)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <ListIcon className="w-4 h-4" />
                    <span>All Streams</span>
                  </div>
                </SelectItem>
                <SelectItem value="sent">
                  <div className="flex items-center gap-2">
                    <ArrowUpIcon className="w-4 h-4 text-blue-500" />
                    <span>Sent Only</span>
                  </div>
                </SelectItem>
                <SelectItem value="received">
                  <div className="flex items-center gap-2">
                    <ArrowDownIcon className="w-4 h-4 text-green-500" />
                    <span>Received Only</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Sort By
            </label>
            <Select
              value={sortBy}
              onValueChange={(v) => onSortChange(v as SortOption)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    <span>Newest First</span>
                  </div>
                </SelectItem>
                <SelectItem value="oldest">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    <span>Oldest First</span>
                  </div>
                </SelectItem>
                <SelectItem value="amount-high">
                  <div className="flex items-center gap-2">
                    <ArrowUpIcon className="w-4 h-4" />
                    <span>Highest Amount</span>
                  </div>
                </SelectItem>
                <SelectItem value="amount-low">
                  <div className="flex items-center gap-2">
                    <ArrowDownIcon className="w-4 h-4" />
                    <span>Lowest Amount</span>
                  </div>
                </SelectItem>
                <SelectItem value="progress">
                  <div className="flex items-center gap-2">
                    <ChartIcon className="w-4 h-4" />
                    <span>By Progress</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border-t border-border pt-3">
            <button
              onClick={() => {
                onStreamTypeChange('all');
                onSortChange('newest');
              }}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
