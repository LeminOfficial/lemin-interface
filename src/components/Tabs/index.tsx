type TabType = 'all' | 'ongoing' | 'pending' | 'expired';

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Tabs = ({ activeTab, onTabChange }: TabsProps) => {
  const tabs: { value: TabType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'expired', label: 'Expired' },
  ];

  return (
    <div className="inline-flex items-center gap-1 sm:gap-2 bg-brand-gray/20 dark:bg-neutral-900/90 border border-brand-base/80 dark:border-gray-700 rounded-xl sm:rounded-2xl p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`h-8 sm:h-9 px-3 sm:px-0 sm:w-24 rounded-xl sm:rounded-brand text-xs sm:text-sm font-medium transition-all ${
            activeTab === tab.value
              ? 'bg-brand-base dark:bg-white text-white dark:text-gray-900'
              : 'text-gray-900 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
