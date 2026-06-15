
const JettLauLogo = ({ className = '', height = 40, width = 'auto', textLight = true }) => {
  const textColor = textLight ? '#ffffff' : '#050505';
  
  return (
    <svg 
      className={className}
      height={height} 
      width={width}
      viewBox="0 0 420 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="logo-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>

      <g filter="url(#logo-glow)">
        {/* "JETT" */}
        <text 
          x="10" 
          y="56" 
          fill={textColor} 
          style={{ 
            fontFamily: "'Montserrat', sans-serif", 
            fontWeight: 900, 
            fontSize: '44px', 
            fontStyle: 'italic',
            letterSpacing: '1px'
          }}
        >
          JETT
        </text>

        {/* Emblem - Styled Z/L Graphic */}
        {/* Blue Z Top Line & Slant */}
        <path 
          className="logo-blue-slant"
          d="M 130 16 L 220 16 L 195 56 L 173 56 L 194 26 L 130 26 Z" 
          fill="#0055D4" 
        />
        
        {/* Red L Bottom Line & Slant */}
        <path 
          className="logo-red-slant"
          d="M 223 26 L 198 66 L 288 66 L 288 56 L 208 56 L 233 26 Z" 
          fill="#FF1E27" 
        />

        {/* "LAU" */}
        <text 
          x="300" 
          y="56" 
          fill={textColor} 
          style={{ 
            fontFamily: "'Montserrat', sans-serif", 
            fontWeight: 900, 
            fontSize: '44px', 
            fontStyle: 'italic',
            letterSpacing: '1px'
          }}
        >
          LAU
        </text>
      </g>
    </svg>
  );
};

export default JettLauLogo;
