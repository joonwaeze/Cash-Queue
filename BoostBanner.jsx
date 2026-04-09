/* ===================== */
/* BOOST BANNER          */
/* Purpose: Displays a promotional banner showing boost multiplier status */
/* Features: Hover effects on border and image saturation */
/* Props: None (self-contained with internal state) */
/* ===================== */
const { useState } = React;

export default function BoostBanner() {
  /* Track hover state for interactive effects */
  const [isHovered, setIsHovered] = useState(false);

  return (
    /* Main banner container with hover border color change */
    <div
      className={`flex items-center justify-center bg-[#FCF4EC] dark:bg-[#3E2E1D] border select-none cursor-pointer outline-none focus:ring-2 focus:ring-[#FCB78B] transition-all duration-200 ${isHovered ? 'border-[#FCB78B]' : 'border-[#EBE4D9]'} dark:border-[#EBE4D9]`}
      style={{
        borderRadius: '18px',
        padding: '8px 5px 8px 10px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Boost banner"
    >
      {/* Watch icon container - increases saturation on hover */}
      <div className="flex-shrink-0 flex items-center justify-center z-10 w-[52px] h-[52px]">
        <img 
          src="./Assest/Watch.svg" 
          alt="Boost watch" 
          className="w-[39px] h-[39px] object-contain flex-shrink-0 transition-all duration-200" 
          style={{ filter: isHovered ? 'saturate(1.8)' : 'saturate(1)' }} 
        />
      </div>

      {/* Banner text content */}
      <div className="overflow-hidden text-left font-['Figtree',_sans-serif] flex ml-1">
        <p className="text-[14px] font-semibold text-[#1F1F1F] dark:text-[#EAEAEA] leading-snug w-[184px] whitespace-normal pr-1">
          Boost active! Rewards unlock up to 6 days sooner
        </p>
      </div>
    </div>
  );
}
