'use client';

import React from 'react';
import Settings from '@/ui/components/setting/setting';

const SettingsPage: React.FC = () => {
  return (
    <div
      id="scrollable-container"
      className="scrollbar-hide"
      style={{
        height: '100vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        scrollBehavior: 'smooth',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <Settings />
      </div>
    </div>
  );
};

export default SettingsPage;
