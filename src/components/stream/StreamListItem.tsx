import type { StreamDetails } from '../../types';
import { formatAmount } from '@/utils/formatAmount';
import { StreamParticipant } from './StreamParticipant';
import { StreamProgressBar } from '@/components/ProgressBar';
import { Badge } from '@/components/ui/badge';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  CurrencyIcon,
} from '@/components/icons';

interface StreamListItemProps {
  stream: StreamDetails;
  streamType: 'sent' | 'received';
  progress: number;
  isActive: boolean;
  formatAddress: (addr: string) => string;
  onClick: (id: string) => void;
}

// Sub-components
interface StreamTypeBadgeProps {
  type: 'sent' | 'received';
  compact?: boolean;
}

const StreamTypeBadge = ({ type, compact = false }: StreamTypeBadgeProps) => {
  const isReceived = type === 'received';
  const iconBg = isReceived ? 'bg-green-500' : 'bg-blue-500';
  const iconSize = compact ? 'w-5 h-5' : 'w-6 h-6';
  const label = compact
    ? isReceived
      ? 'Received'
      : 'Sent'
    : isReceived
    ? 'Received Stream'
    : 'Sent Stream';

  const icon = (
    <div
      className={`${iconSize} rounded-full flex items-center justify-center ${iconBg}`}
    >
      {isReceived ? (
        <ArrowDownIcon className="w-3 h-3 text-white" />
      ) : (
        <ArrowUpIcon className="w-3 h-3 text-white" />
      )}
    </div>
  );

  return (
    <Badge
      variant={type}
      size={compact ? 'sm' : 'md'}
      icon={icon}
      className="border-0"
    >
      {label}
    </Badge>
  );
};

interface AmountDisplayProps {
  stream: StreamDetails;
  size?: 'sm' | 'md';
}

const AmountDisplay = ({ stream, size = 'md' }: AmountDisplayProps) => {
  const containerSize = size === 'sm' ? 'w-5 h-5' : 'w-6 h-6';
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
        {formatAmount(
          stream.totalAmount,
          stream.tokenDecimals,
          stream.tokenSymbol,
        )}
      </span>
      <div
        className={`${containerSize} rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0`}
      >
        <CurrencyIcon
          className={`${iconSize} text-blue-600 dark:text-blue-400`}
        />
      </div>
    </div>
  );
};

// Main component
export const StreamListItem = ({
  stream,
  streamType,
  progress,
  isActive,
  formatAddress,
  onClick,
}: StreamListItemProps) => {
  return (
    <div
      onClick={() => onClick(stream.id.toString())}
      className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-brand-base/20 transition-all cursor-pointer group"
    >
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-[200px]">
          <StreamTypeBadge type={streamType} />
        </div>

        <div className="flex items-center gap-3 min-w-[300px]">
          <StreamParticipant
            address={stream.sender}
            label="From"
            diameter={28}
            formatAddress={formatAddress}
          />
          <ArrowRightIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <StreamParticipant
            address={stream.recipient}
            label="To"
            diameter={28}
            formatAddress={formatAddress}
          />
        </div>

        <div className="bg-brand-base/20 w-[1px] h-9 rounded-full" />

        <div className="min-w-[250px]">
          <StreamProgressBar progress={progress} />
        </div>

        <Badge variant={isActive ? 'active' : 'completed'} size="md">
          {isActive ? 'Active' : 'Completed'}
        </Badge>

        <div className="flex items-center gap-2 min-w-[150px] justify-end">
          <AmountDisplay stream={stream} />
        </div>

        <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-green-700 group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4">
        <div className="flex items-center justify-between">
          <StreamTypeBadge type={streamType} compact />
          <Badge variant={isActive ? 'active' : 'completed'} size="xs">
            {isActive ? 'Active' : 'Completed'}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1">
            <StreamParticipant
              address={stream.sender}
              label="From"
              diameter={24}
              formatAddress={formatAddress}
            />
          </div>
          <ArrowRightIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <div className="flex-1">
            <StreamParticipant
              address={stream.recipient}
              label="To"
              diameter={24}
              formatAddress={formatAddress}
            />
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">
            Progress
          </div>
          <StreamProgressBar progress={progress} />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Total Amount
          </span>
          <AmountDisplay stream={stream} size="sm" />
        </div>
      </div>
    </div>
  );
};
