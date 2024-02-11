import { useState } from 'react';

const useSwipe = (prevPage, nextPage) => {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [deltaY, setDeltaY] = useState(0);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setStartX(touch.clientX);
    setStartY(touch.clientY);
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    setDeltaX(touch.clientX - startX);
    setDeltaY(touch.clientY - startY);
  };

  const handleTouchEnd = () => {
    const swipeLength = Math.abs(deltaX);
    const swipeDirectionThreshold = 50;
    if (swipeLength > swipeDirectionThreshold && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        prevPage();
      } else {
        nextPage();
      }
    }

    // Reset deltas
    setDeltaX(0);
    setDeltaY(0);
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};

export default useSwipe;
