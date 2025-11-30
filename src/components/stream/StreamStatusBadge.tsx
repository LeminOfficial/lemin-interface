import { Badge } from '@/components/ui/badge';
import { CheckIcon, ClockIcon, PulseDot } from '@/components/icons';

interface StreamStatusBadgeProps {
  isCompleted: boolean;
  isActive: boolean;
}

export const StreamStatusBadge = ({
  isCompleted,
  isActive,
}: StreamStatusBadgeProps) => {
  if (isCompleted) {
    return (
      <Badge
        variant="completed"
        size="sm"
        icon={<CheckIcon className="w-3 h-3" />}
      >
        Completed
      </Badge>
    );
  }

  if (isActive) {
    return (
      <Badge
        variant="active"
        size="sm"
        icon={<PulseDot className="bg-blue-500" />}
      >
        Active
      </Badge>
    );
  }

  return (
    <Badge variant="pending" size="sm" icon={<ClockIcon className="w-3 h-3" />}>
      Pending
    </Badge>
  );
};
