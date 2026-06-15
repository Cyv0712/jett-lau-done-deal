const DoneDealLogo = ({ className = '', height = 50, width = 'auto', textLight = true, animated = false }) => {
  const textColor = textLight ? '#ffffff' : '#050505';
  const initialOpacity = animated ? 0 : 1;

  return (
    <svg
      className={className}
      height={height}
      width={width}
      viewBox="0 0 370 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="logo-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>

      <g filter="url(#logo-glow)">
        {/* "DONE" */}
        <text
          className="logo-done-text"
          x="-5"
          y="53"
          fill={textColor}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: '48px',
            fontStyle: 'italic',
            letterSpacing: '1px',
            opacity: initialOpacity
          }}
        >
          DONE
        </text>

        {/* Red L-like shape: slants down-left, then extends left underneath "DONE" */}
        {/* Carrying "JETT LAU" text */}
        <g className="logo-red-group">
          <path
            className="logo-red-slant"
            d="M 170 12 L 188 12 L 160 74 L 45 74 L 45 60 L 148 60 Z"
            fill="#FF1E27"
            style={{ opacity: initialOpacity }}
          />
          {/* Text inside the red bar */}
          <text
            className="logo-jett-lau-text"
            x="96"
            y="71"
            fill="#ffffff"
            textAnchor="middle"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: '11px',
              fontStyle: 'italic',
              letterSpacing: '2px',
              opacity: initialOpacity
            }}
          >
            JETT LAU
          </text>
        </g>

        {/* Blue L-shape: slants down-left, then extends right underneath "DEAL" */}
        <path
          className="logo-blue-slant"
          d="M 196 12 L 214 12 L 192 60 L 290 60 L 290 74 L 168 74 Z"
          fill="#0055D4"
          style={{ opacity: initialOpacity }}
        />

        {/* "DEAL" */}
        <text
          className="logo-deal-text"
          x="210"
          y="53"
          fill={textColor}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: '48px',
            fontStyle: 'italic',
            letterSpacing: '1px',
            opacity: initialOpacity
          }}
        >
          DEAL
        </text>
      </g>
    </svg>
  );
};

export default DoneDealLogo;
