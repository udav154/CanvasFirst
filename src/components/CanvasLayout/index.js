import React, { useState, useEffect, useRef } from "react";

const CanvasLayout = ({ children, ...props }) => {
  const [cursorPoint, setcursorPoint] = useState({ x: 100, y: 100 });

  const setCursor = (event) => {
    const { x, y } = event.nativeEvent;
    setcursorPoint({ x, y });
  };

  return children({ cursorPoint, setCursor, ...props });
};

export default CanvasLayout;
