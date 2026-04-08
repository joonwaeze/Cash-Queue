import React from 'react';

/**
 * UnlockCard Component
 * 
 * A modern mobile UI card component demonstrating an unlock or reward status.
 * Requires the Figtree font to match the design perfectly.
 * 
 * To install Figtree in your project, add the following to your HTML head:
 * <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet">
 * 
 * Or extend your tailwind theme to use Figtree as the default sans-serif font.
 */
// Edit this data object to easily add/change items without touching the component above
export const unlockCardData = {
  title: "Unlocks in 13 days",
  date: "Feb 28",
  items: [
    {
      appName: "Coin Chef",
      earnedDate: "Dec 30",
      appIconUrl: "./Assest/image 54.png", 
      earnedReward: "$0.50"
    },
    {
      appName: "Animals & Coins",
      earnedDate: "Jan 22",
      appIconUrl: "./Assest/image 53.png", 
      earnedReward: "$2.50"
    }
  ]
};

export default function UnlockCard({
  title = unlockCardData.title,
  date = unlockCardData.date,
  items = unlockCardData.items
}) {

  // Dynamically calculate the total earned by parsing the reward strings
  const calculatedTotal = items.reduce((acc, item) => {
    const val = parseFloat((item.earnedReward || "").replace(/[^0-9.-]+/g,""));
    return acc + (isNaN(val) ? 0 : val);
  }, 0);
  const totalEarned = `$${calculatedTotal.toFixed(2)}`;

  return (
    <div className="group w-full max-w-[358px] bg-white dark:bg-[#1E1E1E] rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-none dark:border dark:border-gray-800 p-5 font-['Figtree',_sans-serif] transition-all duration-300">
      
      {/* Top Section */}
      <div className="flex flex-col pb-4">
        <h2 className="text-[17px] font-bold text-gray-900 dark:text-gray-100 leading-snug tracking-tight">
          {title}
        </h2>
        <div className="text-[14px] text-gray-500 dark:text-gray-400 mt-1 font-medium flex items-center space-x-1.5">
          <span>{totalEarned}</span>
          <span className="text-[12px] opacity-70">&bull;</span>
          <span>{date}</span>
        </div>
      </div>

      {/* Bottom Section (List of Apps) */}
      <div className="flex flex-col gap-1">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2.5 -mx-2.5 hover:bg-[#F4F4F4] dark:hover:bg-gray-700/30 rounded-[14px] transition-colors duration-300 ease-in-out cursor-pointer">
            
            {/* Left Side: App Info */}
            <div className="flex items-center space-x-3.5">
              <div className="relative overflow-hidden rounded-[14px] bg-gray-100 dark:bg-gray-800 shadow-sm border border-gray-100/50 dark:border-gray-700/50 group-hover:scale-[1.03] transition-transform duration-300 ease-out">
                <img 
                  src={item.appIconUrl} 
                  alt={`${item.appName} icon`} 
                  className="w-[42px] h-[42px] object-cover flex-shrink-0"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-gray-900 dark:text-gray-100 leading-tight">
                  {item.appName}
                </span>
                <span className="text-[13px] text-gray-400 dark:text-gray-500 mt-0.5 font-medium">
                  Earned {item.earnedDate}
                </span>
              </div>
            </div>
            
            {/* Right Side: Value */}
            <div className="text-[15px] font-bold text-gray-900 dark:text-gray-100">
              {item.earnedReward}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
