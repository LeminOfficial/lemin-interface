import { Badge } from '@/components/ui/badge';

interface StreamStatusProps {
  isValid: boolean;
}

export const StreamStatus = ({ isValid }: StreamStatusProps) => (
  <Badge variant={isValid ? 'ready' : 'incomplete'} size="sm">
    {isValid ? 'Ready' : 'Incomplete'}
  </Badge>
);
