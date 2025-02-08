"use client";

import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/loading.json';

const Loading: React.FC = () => {
  return (
    <div style={styles.container}>
      <Lottie animationData={loadingAnimation} style={styles.animation} loop />
      <p style={styles.text}>Loading...</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  } as React.CSSProperties,
  animation: {
    width: 150,
    height: 150,
  } as React.CSSProperties,
  text: {
    marginTop: 20,
    fontSize: '16px',
    color: '#555',
  } as React.CSSProperties,
};

export default Loading;
