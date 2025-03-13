import React from "react";
import Lottie from "react-lottie";

const LottieBackground = ({ animationData }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div style={{ position: 'relative', height: '50vh', overflow: 'hidden' }}>
      <Lottie options={defaultOptions} height="100%" width="100%" />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        zIndex: 100,
      }} />
    </div>
  );
};

export default LottieBackground;