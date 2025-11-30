import { SearchIcon, InboxIcon, ClipboardIcon } from '@/components/icons';

type IconType = 'search' | 'inbox' | 'clipboard';

interface EmptyStateProps {
  icon?: IconType;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
}

const icons: Record<IconType, React.FC<{ className?: string }>> = {
  search: SearchIcon,
  inbox: InboxIcon,
  clipboard: ClipboardIcon,
};

export const EmptyState = ({
  icon = 'inbox',
  title,
  description,
  action,
}: EmptyStateProps) => {
  const Icon = icons[icon];

  return (
    <div className="text-center py-12">
      <div className="bw-card p-8 max-w-md mx-auto">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        {action && (
          <button
            onClick={action.onClick}
            className={
              action.variant === 'secondary'
                ? 'bw-button-secondary px-6 py-2'
                : 'bw-button-primary px-6 py-2'
            }
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};
