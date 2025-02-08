"use client";

import React, { useState, useEffect } from 'react';
import Loading from '@/app/loading';

const LoadingWrapper: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('useEffect triggered');
    const timer = setTimeout(() => {
      console.log('Timer finished');
      setIsLoading(false);
    }, 5000);

    return () => {
      console.log('Timer cleared');
      clearTimeout(timer);
    };
  }, []);

  console.log('isLoading:', isLoading);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h1>Welcome to the Page!</h1>
        </div>
      )}
    </div>
  );
};

export default LoadingWrapper;
