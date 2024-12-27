import React from 'react';

const TerminalIcon = () => {
  return (
    <div style={{
      width: '64px',
      height: '64px',
      background: '#282C34',
      borderRadius: '8px',
      padding: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      {/* Terminal Kontrol Düğmeleri */}
      <div style={{
        display: 'flex',
        gap: '6px',
        padding: '4px'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#ff5f56'
        }} />
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#ffbd2e'
        }} />
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#27c93f'
        }} />
      </div>

      {/* Terminal İçerik */}
      <div style={{
        color: '#98C379',
        fontFamily: 'monospace',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '2px'
      }}>
        <span style={{ color: '#98C379' }}>$</span>
        <span style={{ 
          width: '6px', 
          height: '12px', 
          background: '#61AFEF',
          animation: 'blink 1s infinite'
        }} />
      </div>
    </div>
  );
};

export default TerminalIcon;