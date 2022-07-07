import React, { useEffect, useState, useRef } from "react";
import * as PIXI from "pixi.js";
import { Stage, Text, AppContext } from "react-pixi-fiber";
import { Circle } from "../CanvasUI";

const Canvas = ({ text, ...props }) => {
  const [canvasWidth, setCanvasWidth] = useState({
    height: window.innerHeight,
    width: window.innerHeight,
  });

  const [cursorCoord, setCursorCoord] = useState([100, 100]);

  const canvasWrap = useRef(null);
  const resizeTimeout = useRef(null);

  const options = {
    backgroundColor: 0xffffff,
    interactive: true,
    antialiasing: false,
    resolution: 1,
  };

  const handleChange = (event) => {
    console.log('e', event)
    const coord = [event.nativeEvent.x, event.nativeEvent.y];
    setCursorCoord(coord);
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
        onPointerDown={() => {
          console.log("12312312", 12312312);
        }}
        onPointerMove={handleChange}
      >
        <AppContext.Consumer>
          {(app) => {
            return (
              <>
                <Text
                  x={500}
                  y={500}
                  style={{ color: 0x000000 }}
                  text={"TEXT TEXT TEXT TEXT"}
                />
                <Circle  fill={0xfff} x={cursorCoord[0]} y={cursorCoord[1]} radius={10} id={6}  lineStyle={1}/>
              </>
            );
          }}
        </AppContext.Consumer>
      </Stage>
    </div>
  );
};
export default Canvas;
