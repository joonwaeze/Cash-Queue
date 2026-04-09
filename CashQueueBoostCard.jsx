/* ===================== */
/* CASH QUEUE BOOST CARD */
/* Purpose: Displays reward progress, tasks list, and actions to earn points */
/* Features: Progress bar, reward icons, hover effects, footer action button */
/* ===================== */
const { useState } = React;

/* To add/modify reward items, edit: data/cashQueueBoostData.js */
/* Or use the exported data object below */

export const cashQueueBoostData = {
  progressData: { current: 80, target: 200 },
  cardMeta: {
    title: "Cash Queue Boost",
    subtitle: "Next reward",
    footerText: "See all"
  },
  rewardItems: [
    {
      id: 1,
      primaryText: "Complete daily streak",
      secondaryText: "Keep it alive!",
      reward: "80 pts",
      iconBg: "#FEE4E2",
      iconUrl: "./Assest/icon-flame.svg"
    },
    {
      id: 2,
      primaryText: "Scan receipt",
      secondaryText: "Get paid on your purchases",
      reward: "100 pts",
      iconBg: "#FFE4D9",
      iconUrl: "./Assest/icon-receipt.svg"
    },
    {
      id: 3,
      primaryText: "Watch an ad",
      secondaryText: "Takes 1 minute",
      reward: "80 pts",
      iconBg: "#FFF3D9",
      iconUrl: "./Assest/icon-eyes.svg"
    }
  ]
};

/* ===================== */
/* CHEVRON DOWN ICON     */
/* Purpose: Small downward arrow for footer "See all" button */
/* ===================== */
const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

/* ===================== */
/* CASH QUEUE BOOST CARD */
/* Purpose: Main card component displaying reward progress and tasks */
/* Props: progress, title, subtitle, footerText, items, maxVisibleItems */
/* ===================== */
export default function CashQueueBoostCard({
  progress = cashQueueBoostData.progressData,
  title = cashQueueBoostData.cardMeta.title,
  subtitle = cashQueueBoostData.cardMeta.subtitle,
  footerText = cashQueueBoostData.cardMeta.footerText,
  items = cashQueueBoostData.rewardItems,
  maxVisibleItems = 3
}) {
  /* Track footer hover state for chevron animation */
  const [isFooterHovered, setIsFooterHovered] = useState(false);
  /* Track expanded state for "See more/Less" toggle */
  const [isExpanded, setIsExpanded] = useState(false);

  /* Calculate progress percentage for the progress bar */
  const progressPercent = (progress.current / progress.target) * 100;

  /* Determine which items to display based on expanded state */
  const displayedItems = isExpanded ? items : items.slice(0, maxVisibleItems);
  const hasMoreItems = items.length > maxVisibleItems;

  return (
    /* Main card container with white background and shadow */
    <div className="w-full max-w-[358px] bg-white dark:bg-[#1E1E1E] rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:shadow-none dark:border dark:border-gray-800 p-5">
      <div className="flex flex-col">

        {/* Progress section: current/target points with badge */}
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-[32px] font-bold text-[#FF5C01] leading-none">{progress.current}</span>
          <span className="text-[18px] font-semibold text-[#333333] dark:text-[#999999]">/{progress.target}</span>
          <div className="w-6 h-6 rounded-full bg-[#FFF3EC] flex items-center justify-center ml-1">
            <span className="text-[11px] font-bold text-[#FF7749]">pts</span>
          </div>
        </div>

        {/* Progress bar showing current progress toward goal */}
        <div className="h-1.5 bg-[#F0F0F0] dark:bg-gray-700 rounded-full overflow-hidden mb-5">
          <div
            className="h-full bg-[#FF5C01] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Title and subtitle */}
        <div className="mb-5">
          <h2 className="text-[20px] font-bold text-[#333333] dark:text-[#E5E5E5] leading-tight">{title}</h2>
          <p className="text-[14px] font-medium text-[#999999] dark:text-[#666666] mt-0.5">{subtitle}</p>
        </div>

        {/* List of reward tasks with icons and point amounts */}
        <div className="flex flex-col gap-2">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2.5 -mx-2.5 hover:bg-[#FAFAFA] dark:hover:bg-gray-700/30 rounded-[14px] transition-all duration-300 ease cursor-pointer hover:scale-[1.02]"
            >
              {/* Icon and task description */}
              <div className="flex items-center space-x-3.5">
                <div
                  className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center flex-shrink-0 overflow-hidden"
                  style={{ backgroundColor: item.iconBg }}
                >
                  <img
                    src={item.iconUrl}
                    alt={item.primaryText}
                    className="w-[42px] h-[42px] object-contain"
                  />
                </div>
                {/* Task primary and secondary text */}
                <div className="flex flex-col min-w-0">
                  <span className="text-[16px] font-semibold text-[#333333] dark:text-gray-100 leading-tight truncate">
                    {item.primaryText}
                  </span>
                  <span className="text-[12px] font-semibold text-[#666666] dark:text-[#666666] mt-0.5 truncate">
                    {item.secondaryText}
                  </span>
                </div>
              </div>

              {/* Reward points amount */}
              <div className="text-[18px] font-bold text-[#FF5C01]">
                {item.reward}
              </div>
            </div>
          ))}
        </div>

        {/* Footer "See more/Less" button with chevron animation */}
        {/* Only show button if there are more items than maxVisibleItems */}
        {hasMoreItems && (
          <button
            className="mt-4 mx-auto flex items-center gap-1.5 px-4 py-2 text-[14px] font-semibold text-[#999999] dark:text-[#666666] hover:text-[#FF5C01] dark:hover:text-[#FF5C01] transition-colors duration-200 rounded-lg hover:bg-[#FFF3EC] dark:hover:bg-[#FFF3EC]/10"
            onMouseEnter={() => setIsFooterHovered(true)}
            onMouseLeave={() => setIsFooterHovered(false)}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "See less" : footerText}
          >
            <span>{isExpanded ? "See less" : footerText}</span>
            <span className={`transition-transform duration-200 ${isFooterHovered ? 'translate-y-0.5' : ''}`}>
              <ChevronDownIcon />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
