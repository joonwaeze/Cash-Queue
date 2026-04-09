/* ===================== */
/* CASH QUEUE BOOST DATA */
/* Purpose: Data structure for the CashQueueBoostCard reward system */
/* How to add more items: Simply copy an item block and update the values */
/* ===================== */

/* Progress data - current and target points */
export const progressData = {
  current: 80,
  target: 200
};

/* Card metadata */
export const cardMeta = {
  title: "Cash Queue Boost",
  subtitle: "Click to complete task",
  footerText: "See all"
};

/* ===================== */
/* REWARD ITEMS LIST     */
/* Purpose: Array of reward tasks with their details */
/* Properties:                                                          */
/*   - id: Unique identifier (required for React key)                    */
/*   - primaryText: Main task description                                */
/*   - secondaryText: Subtitle/hint for the task                        */
/*   - reward: Points earned for completing the task (e.g., "80 pts")  */
/*   - iconBg: Background color for the icon container (hex code)       */
/*   - iconUrl: Path to the icon image (local or remote)                */
/* ===================== */
export const rewardItems = [
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
  /* Add more items below by copying the structure above */
];

/* ===================== */
/* TEMPLATE FOR NEW ITEM */
/* ===================== */
/*
{
  id: 4,
  primaryText: "Your task name",
  secondaryText: "Description of the task",
  reward: "50 pts",
  iconBg: "#E0E0E0",
  iconUrl: "./Assest/your-icon.svg"
},
*/
