interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = 'Loading...' }: LoadingStateProps) => (
  <div className="flex items-center justify-center py-20">
    <div className="text-center">
      <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  </div>
);
