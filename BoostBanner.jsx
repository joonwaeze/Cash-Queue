const { useState } = React;
// We extract motion directly from window.Motion.
// Ensure framer-motion is loaded via CDN before this component mounts.

export default function BoostBanner() {
  const [isHovered, setIsHovered] = useState(false);
  const motion = window.Motion ? window.Motion.motion : null;

  if (!motion) {
    return <div className="text-red-500 text-sm">Framer Motion script not loaded.</div>;
  }

  return (
    <motion.div
      layout
      className={`flex items-center justify-center bg-[#FEF5EC] dark:bg-[#3E2E1D] border shadow-sm select-none cursor-pointer outline-none focus:ring-2 focus:ring-[#FF5C01]/30 transition-all duration-200 ${isHovered ? 'border-[#FCB78B]' : 'border-[#F5E6D3]'} dark:border-[#53402C]`}
      style={{
        borderRadius: '20px',
        padding: '12px 20px 12px 16px',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      aria-label="Boost banner"
    >
      <motion.div layout="position" className="flex-shrink-0 flex items-center justify-center z-10 w-[52px] h-[52px]">
        <img src="./Assest/Watch.svg" alt="Boost watch" className="w-[26px] h-[26px] object-contain flex-shrink-0 transition-all duration-200" style={{ filter: isHovered ? 'saturate(1.8)' : 'saturate(1)' }} />
      </motion.div>

      <motion.div
        layout="position"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="overflow-hidden text-left font-['Figtree',_sans-serif] flex ml-1"
      >
        <p className="text-[14px] font-semibold text-[#1F1F1F] dark:text-[#EAEAEA] leading-snug w-[184px] whitespace-normal pr-1">
          1.1x Boost active! Rewards unlock up to 6 days sooner
        </p>
      </motion.div>
    </motion.div>
  );
}
