import React, { useEffect, useState, useRef } from "react";
import { Stage, Text, AppContext } from "react-pixi-fiber";

const Canvas = () => {
  const [canvasWidth, setCanvasWidth] = useState({
    height: window.innerHeight,
    width: window.innerHeight,
  });

  const canvasWrap = useRef(null);
  const resizeTimeout = useRef(null);

  const options = {
    backgroundColor: 0x10bb99,
  };

  useEffect(() => {
    clearTimeout(resizeTimeout.current);
    resizeTimeout.current = null;
  }, [canvasWidth]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry?.target) {
          const { clientWidth, clientHeight } = entry.target;
          if (!resizeTimeout.current) {
            resizeTimeout.current = setTimeout(() => {
              setCanvasWidth({ width: clientWidth, height: clientHeight });
            }, 5);
          }
        }
      }
    });
    resizeObserver.observe(canvasWrap.current);
  }, []);

  return (
    <div ref={canvasWrap} className={"canvas_wrap"}>
      <Stage
        options={options}
        width={canvasWidth.width}
        height={canvasWidth.height}
        className={"scene"}
      >
        <AppContext.Consumer>
          {(app) => {
            return (
              <>
                <Text x={20} y={10} style={{color: 0x000000}}  text="Hello world!" />
              </>
            );
          }}
        </AppContext.Consumer>
      </Stage>
    </div>
  );
};
export default Canvas;
