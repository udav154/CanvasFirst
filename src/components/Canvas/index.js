import React, { useEffect, useState, useRef } from "react";
import { Stage, Text, AppContext } from "react-pixi-fiber";
import {
  CanvasUI,
  TrailCursor,
  CursorCircle,
  Viewport,
  CustomTrail,
  Track,
  Stats,
} from "@components";
import CanvasLayout from "components/CanvasLayout";

const Canvas = ({ text, ...props }) => {
  const [canvasWidth, setCanvasWidth] = useState({
    height: window.innerHeight,
    width: window.innerHeight,
  });

  // const [cursorPoint, setcursorPoint] = useState({ x: 100, y: 100 });

  // const setCursor = (event) => {
  //   const { x, y } = event.nativeEvent;
  //   setcursorPoint({ x, y });
  // };

  const canvasWrap = useRef(null);
  const resizeTimeout = useRef(null);

  const options = {
    backgroundColor: 0xebebebe,
    antialiasing: true,
    resolution: 1,
    powerPreference: "high-performance",
  };

  useEffect(() => {
    console.log("Update Size Canvas");
    clearTimeout(resizeTimeout.current);
    resizeTimeout.current = null;
  }, [canvasWidth]);

  useEffect(() => {
    console.log("Did Mount");
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
      <CanvasLayout>
        {({
          circleRadius,
          cursorPoint,
          trailDrawPoints,
          handleMouseMove,
          ...layoutProps
        }) => {
          return (
            <Stage
              className={"scene"}
              options={options}
              width={canvasWidth.width}
              height={canvasWidth.height}
              onPointerMove={handleMouseMove}
            >
              <Stats />
              <AppContext.Consumer>
                {(app) => {
                  return (
                    <>
                      {/* <Viewport app={app}> */}

                      {/* <TrailCursor app={app} /> */}
                      {/* <CursorCircle app={app} /> */}

                      {trailDrawPoints.length > 2 ? (
                        <>
                          <Track coords={trailDrawPoints} />
                          <CustomTrail
                            fill={0x000000}
                            coords={trailDrawPoints}
                          />
                        </>
                      ) : null}

                      <CanvasUI.Circle
                        fill={0xfff}
                        x={cursorPoint?.x  || 50}
                        y={cursorPoint?.y || 50}
                        radius={circleRadius}
                        id={6}
                        lineStyle={1}
                        alpha={0.3}
                      />

                      {/* </Viewport> */}
                    </>
                  );
                }}
              </AppContext.Consumer>
            </Stage>
          );
        }}
      </CanvasLayout>
    </div>
  );
};
export default Canvas;
