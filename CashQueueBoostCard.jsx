/* ===================== */
/* CASH QUEUE BOOST CARD */
/* Purpose: Displays reward progress, tasks list, and actions to earn points */
/* Features: Progress bar, reward icons, hover effects, click to complete, swipe animations */
/* ===================== */
const { useState } = React;

/* CSS for animations */
const style = `
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in { animation: fadeSlideIn 300ms ease-in-out forwards; }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.5); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-scale-in { animation: scaleIn 300ms ease-in-out forwards; }
  @keyframes swipeRightToLeft {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(-120%); opacity: 0.5; }
  }
  .animate-swipe-out { animation: swipeRightToLeft 350ms ease-in-out forwards; }
  @keyframes slideInFromLeft {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  .animate-slide-in { animation: slideInFromLeft 350ms ease-in-out forwards; }
`;

export const cashQueueBoostData = {
  progressData: { current: 100, target: 500 },
  cardMeta: {
    title: "Checklist",
    subtitle: "click each item to progress",
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
    },
    {
      id: 4,
      primaryText: "Clash of Clans",
      secondaryText: "Download & Play",
      reward: "150 pts",
      iconBg: "#FFF3D9",
      iconUrl: "./Assest/Clashofclans.svg"
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
/* CHECK ICON            */
/* Purpose: Checkmark for completed state */
/* ===================== */
const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" fill="#1F1F1F"/>
    <path d="M15.5 9L11 14.5L9 12.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
  /* Track items currently swiping (animation) */
  const [swipingItems, setSwipingItems] = useState(new Set());
  /* Track items sliding in to bottom */
  const [slidingInItems, setSlidingInItems] = useState(new Set());
  /* Track completed items */
  const [completedItems, setCompletedItems] = useState(new Set());
  /* Track progress with accumulated rewards */
  const [localProgress, setLocalProgress] = useState({ ...progress });
  /* Track sorted item order */
  const [sortedItemIds, setSortedItemIds] = useState(() => items.map(item => item.id));

  /* Track card phase: 'active' | 'exiting' | 'success' */
  const [cardPhase, setCardPhase] = useState('active');

  // Sort items by sortedItemIds order
  const getSortedItems = () => {
    return [...items].sort((a, b) => {
      const aIndex = sortedItemIds.indexOf(a.id);
      const bIndex = sortedItemIds.indexOf(b.id);
      return aIndex - bIndex;
    });
  };

  // Calculate progress percentage for the progress bar
  const progressPercent = (localProgress.current / localProgress.target) * 100;

  /* Determine which items to display based on expanded state and sorted order */
  const sortedItems = getSortedItems();
  const displayedItems = isExpanded ? sortedItems : sortedItems.slice(0, maxVisibleItems);
  const hasMoreItems = items.length > maxVisibleItems;

  /* Handle item click to mark as completed */
  const handleItemClick = (item) => {
    if (completedItems.has(item.id) || swipingItems.has(item.id) || slidingInItems.has(item.id)) return;

    const rewardValue = parseInt(item.reward.replace(/[^0-9]/g, ''), 10);

    setCompletedItems(prev => new Set([...prev, item.id]));
    
    setLocalProgress(prev => {
      const newCurrent = Math.min(prev.current + rewardValue, prev.target);
      
      // Check if target reached
      if (newCurrent >= prev.target && prev.current < prev.target) {
        // Wait for progress bar animation and swipe to finish
        setTimeout(() => {
          setCardPhase('exiting');
          
          // Wait for exit animation to complete before showing success
          setTimeout(() => {
            setCardPhase('success');
            
            // Trigger full-viewport confetti falling from top
            if (window.confetti) {
              window.confetti({
                particleCount: 120,
                angle: 270,        // Straight down
                spread: 120,       // Wide spread
                origin: { x: 0.5, y: -0.1 }, // Top of screen
                startVelocity: 40,
                gravity: 0.8,      // Light, floaty feel
                ticks: 350,
                colors: ['#FF5C01', '#FFB78B', '#FEE4E2', '#FFF3D9', '#4CAF50', '#2196F3']
              });
            }
          }, 400); // Wait for exit transition (400ms)
        }, 1000); 
      }
      
      return {
        ...prev,
        current: newCurrent
      };
    });

    setTimeout(() => {
      setSwipingItems(prev => new Set([...prev, item.id]));
    }, 900);

    setTimeout(() => {
      setSwipingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });

      setSlidingInItems(prev => new Set([...prev, item.id]));
      
      setSortedItemIds(prev => {
        const newIds = prev.filter(id => id !== item.id);
        return [...newIds, item.id];
      });
    }, 1250);

    setTimeout(() => {
      setSlidingInItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 1600);
  };

  return (
    <>
      <style>{style}</style>
      <div className="w-full max-w-[358px] bg-white dark:bg-[#1E1E1E] rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-none dark:border dark:border-gray-800 p-5 overflow-hidden relative min-h-[300px]">
        {/* ACTIVE STATE WRAPPER. Always relative to keep card height intact. Scales down and fades out on exit. */}
        <div className={`flex flex-col pt-3 transition-all duration-400 ease-in-out transform origin-center ${cardPhase !== 'active' ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
        {/* Title and subtitle */}
        <div className="mb-2 text-center">
          <h2 className="text-[22px] font-semibold text-[#333333] dark:text-[#E5E5E5] leading-tight">{title}</h2>
          <p className="text-[16px] font-semibold text-[#666666] dark:text-[#666666] mt-0">{subtitle}</p>
        </div>

        {/* Progress container with bar and pts count */}
        <div className="mb-3 flex flex-col items-center">
          <div className="h-3 bg-[#F0F0F0] dark:bg-gray-700 rounded-full overflow-hidden mb-2 w-[160px]">
            <div
              className="h-full bg-[#FF5C01] rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="w-[160px] flex justify-end">
            <div className="flex items-baseline gap-1">
              <span className="text-[14px] font-bold text-[#FF5C01] leading-none">{localProgress.current}</span>
              <span className="text-[14px] font-bold text-[#333333] dark:text-[#999999]">/{localProgress.target}</span>
              <span className="text-[14px] font-semibold text-[#333333]">pts</span>
            </div>
          </div>
        </div>

        {/* List of reward tasks */}
        <div className="flex flex-col gap-2">
          {displayedItems.map((item, index) => {
            const sortedIndex = sortedItems.indexOf(item);
            const isNewlyVisible = isExpanded && index >= maxVisibleItems;
            const isCompleted = completedItems.has(item.id);
            const isSwiping = swipingItems.has(item.id);
            const isSlidingIn = slidingInItems.has(item.id);

            return (
              <div
                key={item.id}
                onClick={() => !isCompleted && !isSwiping && !isSlidingIn && handleItemClick(item)}
                className={`flex items-center justify-between p-2.5 -mx-2.5 rounded-[14px] transition-all duration-300 ease-in-out ${isCompleted ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'} hover:bg-[#FAFAFA] dark:hover:bg-gray-700/30 hover:scale-[1.02] ${isSwiping ? 'animate-swipe-out' : isSlidingIn ? 'animate-slide-in' : isNewlyVisible ? 'animate-fade-in' : ''}`}
              >
                <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                  <div
                    className="w-[44px] h-[44px] rounded-[14px] flex items-center justify-center flex-shrink-0 overflow-hidden"
                    style={{ backgroundColor: item.iconBg }}
                  >
                    <img
                      src={item.iconUrl}
                      alt={item.primaryText}
                      className={`w-[42px] h-[42px] object-contain transition-all duration-300 ${isCompleted ? 'grayscale' : ''}`}
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`text-[16px] font-semibold leading-tight truncate transition-all duration-300 ${isCompleted ? 'text-[#333333] line-through opacity-60' : 'text-[#333333] dark:text-gray-100'}`}>
                      {item.primaryText}
                    </span>
                    <span className={`text-[14px] font-semibold mt-0.5 truncate transition-all duration-300 ${isCompleted ? 'text-[#333333] opacity-60' : 'text-[#666666] dark:text-[#666666]'}`}>
                      {isCompleted ? 'Done!' : item.secondaryText}
                    </span>
                  </div>
                </div>

                <div className={`text-[18px] font-bold pl-2 transition-all duration-300 ${isCompleted ? 'w-[24px] h-[24px]' : 'text-[#1F1F1F]'}`}>
                  {isCompleted ? (
                    <div className="animate-scale-in">
                      <CheckIcon />
                    </div>
                  ) : (
                    item.reward
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer "See more/Less" button */}
        {hasMoreItems && (
          <button
            className="mt-4 mx-auto flex items-center gap-1.5 px-4 py-2 text-[14px] font-semibold text-[#999999] dark:text-[#666666] hover:text-[#FF5C01] dark:hover:text-[#FF5C01] transition-colors duration-200 ease-in-out rounded-lg"
            onMouseEnter={() => setIsFooterHovered(true)}
            onMouseLeave={() => setIsFooterHovered(false)}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "See less" : footerText}
          >
            <span>{isExpanded ? "See less" : footerText}</span>
            <span className={`transition-transform duration-200 ease-in-out ${isFooterHovered ? 'translate-y-0.5' : ''} ${isExpanded ? 'rotate-180' : ''}`}>
              <ChevronDownIcon />
            </span>
          </button>
        )}
        </div>

        {/* SUCCESS STATE WRAPPER. Positioned absolute to perfectly overlap original card bounds. */}
        <div className={`absolute inset-0 p-5 flex flex-col items-center justify-center transition-all duration-500 ease-in-out transform origin-center ${cardPhase === 'success' ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}>
          <h2 className="text-[28px] font-bold text-[#333333] dark:text-[#EAEAEA] leading-tight text-center mb-2">
            Congratulations!
          </h2>
          <p className="text-[16px] font-semibold text-[#666666] dark:text-[#999999] text-center max-w-[240px]">
            You've successfully reached your target for today.
          </p>
        </div>
      </div>
    </>
  );
}