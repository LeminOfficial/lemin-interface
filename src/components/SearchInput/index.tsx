import { SearchIcon } from '@/components/icons';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}: SearchInputProps) => (
  <div className={`relative ${className}`}>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-3 sm:pl-4 pr-9 sm:pr-10 h-11 py-2 sm:py-2.5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
    />
    <SearchIcon className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
  </div>
);
