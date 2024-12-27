const TerminalIconSVG = () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#282C34"/>
      
      {/* Kontrol Düğmeleri */}
      <circle cx="16" cy="16" r="4" fill="#ff5f56"/>
      <circle cx="28" cy="16" r="4" fill="#ffbd2e"/>
      <circle cx="40" cy="16" r="4" fill="#27c93f"/>
      
      {/* Terminal Prompt */}
      <text x="16" y="40" fill="#98C379" fontSize="16" fontFamily="monospace">$</text>
      <rect x="28" y="32" width="2" height="12" fill="#61AFEF">
        <animate
          attributeName="opacity"
          values="1;0;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
  
  export default TerminalIconSVG;