import { useEffect, useState } from 'react';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    addEventListeners();
    handleLinkHoverEvents();

    return () => removeEventListeners();
  }, []);

  const handleLinkHoverEvents = () => {
    document.querySelectorAll('a').forEach((el) => {
      el.addEventListener('mouseover', () => setLinkHovered(true));
      el.addEventListener('mouseout', () => setLinkHovered(false));
    });
  };

  return (
    <>
      <div
        className="cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: hidden ? 0 : 1,
          transform: `scale(${clicked ? 0.8 : linkHovered ? 1.5 : 1})`,
        }}
      />
      <div
        className="cursor-follower"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: hidden ? 0 : 1,
          transform: `scale(${clicked ? 2 : linkHovered ? 0.5 : 1})`,
        }}
      />
    </>
  );
};

export default Cursor; 