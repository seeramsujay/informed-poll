import { useState, useCallback } from 'react';
import { candidates } from '../data/mock';

export const useCandidates = (initialIndex = 0) => {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(null);
  const [isWiggling, setIsWiggling] = useState(false);

  const nextCandidate = useCallback((action) => {
    setDirection(action);
    setIsWiggling(true);
    
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % candidates.length);
      setDirection(null);
      setIsWiggling(false);
    }, 400);
  }, []);

  return {
    currentCandidate: candidates[index],
    nextCandidate: candidates[(index + 1) % candidates.length],
    thirdCandidate: candidates[(index + 2) % candidates.length],
    currentIndex: index,
    direction,
    isWiggling,
    handleAction: nextCandidate
  };
};
