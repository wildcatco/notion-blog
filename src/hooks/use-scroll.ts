import { useEffect, useRef, useState } from 'react';

const SCROLL_THROTTLE = 100;
const BUTTON_DURATION = 1500;
const SCROLL_THRESHOLD = 800;

export default function useScroll() {
  const [show, setShow] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    button.addEventListener('mousedown', handleButtonClick);

    let timeId: NodeJS.Timeout | null;
    let durationId: NodeJS.Timeout | null;

    const handleScroll = () => {
      if (timeId) return;

      timeId = setTimeout(() => {
        timeId = null;

        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > SCROLL_THRESHOLD) {
          setShow(true);
          durationId && clearTimeout(durationId);
          durationId = setTimeout(() => {
            setShow(false);
          }, BUTTON_DURATION);
        } else {
          setShow(false);
        }
      }, SCROLL_THROTTLE);
    };

    const handleMouseOver = () => {
      durationId && clearTimeout(durationId);
    };

    const handleMouseLeave = () => {
      durationId = setTimeout(() => {
        setShow(false);
      }, BUTTON_DURATION);
    };

    document.addEventListener('scroll', handleScroll);
    button.addEventListener('mouseover', handleMouseOver);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousedown', handleButtonClick);
      document.removeEventListener('scroll', handleScroll);
      button.removeEventListener('mouseover', handleMouseOver);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [buttonRef]);

  return { show, buttonRef };
}
