import { useEffect } from 'react';

const useToggle = initialValue => {
  const [value, setValue] = useToggle(initialValue);
  const toggle = () => {
    setValue(!value);
  };
  return [value, toggle];
};

const useClickOutside = (refs, callback) => {
  const handleClick = event => {
    const isOutside = refs.every(ref => ref.current && !ref.current.contains(event.target));
    if (isOutside) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refs, callback]);
};

const truncateString = (maxLength, string) => {
  if (string.length <= maxLength) {
    return string;
  } else {
    return string.substring(0, maxLength) + '...';
  }
};


export { useToggle, useClickOutside, truncateString, };
