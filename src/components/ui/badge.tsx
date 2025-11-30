import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors',
  {
    variants: {
      variant: {
        active:
          'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
        completed:
          'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
        pending:
          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
        expired:
          'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700',
        sent: 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
        received:
          'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300 border-green-200 dark:border-green-800',
        ready: 'bg-brand-base text-white border-brand-base',
        incomplete: 'bg-secondary text-muted-foreground border-secondary',
        default:
          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700',
        success:
          'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
        warning:
          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
        error:
          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
        info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      },
      size: {
        xs: 'px-2 py-0.5 text-xs',
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

export const Badge = ({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
};

export { badgeVariants };
