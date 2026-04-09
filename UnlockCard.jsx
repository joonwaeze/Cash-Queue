/* ===================== */
/* UNLOCK CARD DATA      */
/* Purpose: Data structure for the UnlockCard showing earned rewards */
/* Contains: title, date, and array of app items with earned rewards */
/* ===================== */
export const unlockCardData = {
  title: "Unlocks in 13 days",
  date: "Apr 20",
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
    },
    {
      appName: "Monopoly Go!",
      earnedDate: "Jan 22",
      appIconUrl: "./Assest/image 55.png",
      earnedReward: "$5.00"
    }
  ]
};

/* ===================== */
/* UNLOCK CARD           */
/* Purpose: Displays a list of apps with their earned rewards and dates */
/* Features: Calculates total earned, displays app icons, hover animations */
/* Props: title, date, items (all with fallback to unlockCardData) */
/* ===================== */
export default function UnlockCard({
  title = unlockCardData.title,
  date = unlockCardData.date,
  items = unlockCardData.items
}) {
  /* Calculate total earned amount from all reward items */
  const calculatedTotal = items.reduce((acc, item) => {
    const val = parseFloat((item.earnedReward || "").replace(/[^0-9.-]+/g, ""));
    return acc + (isNaN(val) ? 0 : val);
  }, 0);
  const totalEarned = `$${calculatedTotal.toFixed(2)}`;

  return (
    /* Main card container with white background and shadow */
    <div className="w-full max-w-[358px] bg-white dark:bg-[#1E1E1E] rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-none dark:border dark:border-gray-800 p-5">

      {/* Card header: title and summary stats */}
      <div className="flex flex-col pb-5">
        {/* Title with highlighted "X days" text in orange */}
        <h2 className="text-[18px] font-bold text-[#333333] dark:text-[#333333] leading-snug tracking-tight">
          {typeof title === 'string' ? title.split(/(\d+ days)/i).map((part, i) =>
            /^\d+ days$/i.test(part) ? <span key={i} className="text-[#FF5C01]">{part}</span> : part
          ) : title}
        </h2>
        {/* Total earned amount and date */}
        <div className="text-[16px] font-bold text-[#666666] mt-1 flex items-center space-x-1.5">
          <span>{totalEarned}</span>
          <span>&bull;</span>
          <span>{date}</span>
        </div>
      </div>

      {/* List of reward items with app icons and earned amounts */}
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-2.5 -mx-2.5 hover:bg-[#FAFAFA] dark:hover:bg-gray-700/30 rounded-[14px] transition-all duration-300 ease cursor-pointer hover:scale-[1.02]"
          >
            {/* App icon and name */}
            <div className="flex items-center space-x-3.5">
              {/* App icon in rounded container */}
              <div className="relative overflow-hidden rounded-[14px] bg-gray-100 dark:bg-gray-800 shadow-sm border border-gray-100/50 dark:border-gray-700/50">
                <img
                  src={item.appIconUrl}
                  alt={`${item.appName} icon`}
                  className="w-[44px] h-[44px] object-cover flex-shrink-0"
                />
              </div>
              {/* App name and earned date */}
              <div className="flex flex-col">
                <span className="text-[16px] font-semibold text-[#333333] dark:text-gray-100 leading-tight">
                  {item.appName}
                </span>
                <span className="text-[16px] font-semibold text-[#666666] dark:text-[#666666] mt-0.5">
                  Earned {item.earnedDate}
                </span>
              </div>
            </div>

            {/* Reward amount displayed on the right */}
            <div className="text-[18px] font-bold text-[#333333] dark:text-[#333333]">
              {item.earnedReward}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
