const { useState } = React;

export default function BoostBanner() {
  const [isHovered, setIsHovered] = useState(false);
  const motion = window.Motion ? window.Motion.motion : null;

  if (!motion) {
    return <div className="text-red-500 text-sm">Framer Motion not loaded.</div>;
  }

  return (
    <motion.div
      layout
      className={`flex items-center justify-center bg-[#FCF4EC] dark:bg-[#3E2E1D] border select-none cursor-pointer outline-none focus:ring-2 focus:ring-[#FCB78B] transition-all duration-200 ${isHovered ? 'border-[#FCB78B]' : 'border-[#EBE4D9]'} dark:border-[#EBE4D9]`}
      style={{
        borderRadius: '18px',
        padding: '8px 5px 8px 10px',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      aria-label="Boost banner"
    >
      <motion.div layout="position" className="flex-shrink-0 flex items-center justify-center z-10 w-[52px] h-[52px]">
        <img 
          src="./Assest/Watch.svg" 
          alt="Boost watch" 
          className="w-[39px] h-[39px] object-contain flex-shrink-0 transition-all duration-200" 
          style={{ filter: isHovered ? 'saturate(1.8)' : 'saturate(1)' }} 
        />
      </motion.div>

      <motion.div
        layout="position"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="overflow-hidden text-left font-['Figtree',_sans-serif] flex ml-1"
      >
        <p className="text-[14px] font-semibold text-[#1F1F1F] dark:text-[#EAEAEA] leading-snug w-[184px] whitespace-normal pr-1">
          5x Boost active! Rewards unlock up to 6 days sooner
        </p>
      </motion.div>
    </motion.div>
  );
}