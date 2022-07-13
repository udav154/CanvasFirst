import Viewport from "components/Viewport";
import React, { useEffect, useState, useRef } from "react";
import { Stage, Text, AppContext } from "react-pixi-fiber";
import { Circle } from "../CanvasUI";

const concatSortArr2 = (arr1 = [], arr2 = []) => {
  const bothArr = arr1.concat(arr2);
  const max = Math.max(...bothArr);
  const min = Math.min(...bothArr);
  const res = [min];
  let tempNumber = min;
  while (tempNumber !== max) {
    tempNumber = Math.min(...bothArr.filter((el) => el > tempNumber));
    res.push(tempNumber);
  }
  return res;
};

const concatSortArrs = (arr1 = [], arr2 = []) => {
  let res = [];
  let currMinArr1Idx = 0;
  let currMinArr2Idx = 0;

  for (let i = currMinArr1Idx; i < arr1.length; i++) {
    for (let j = currMinArr2Idx; j < arr2.length; j++) {
      if (arr2[j] < arr1[i]) {
        res.push(arr2[j]);
        currMinArr2Idx = j + 1;
      } else {
        res.push(arr1[i]);
        currMinArr1Idx = i + 1;
        break;
      }
    }
  }
  if (currMinArr1Idx !== arr1.length) {
    res = res.concat(arr1.slice(currMinArr1Idx));
  } else {
    res = res.concat(arr2.slice(currMinArr2Idx));
  }
  return res;
};
// console.log(concatSortArr2([1, 4, 4, 4, 5, 7, 9, 10, 22], [2, 3, 4, 8, 10]));

// const EventsCollector = ({ app, children, ...props }) => {
//   return children({});
// };

const Canvas = ({ text, ...props }) => {
  const [canvasWidth, setCanvasWidth] = useState({
    height: window.innerHeight,
    width: window.innerHeight,
  });

  const [cursorCoord, setCursorCoord] = useState([100, 100]);

  const cursorRef = useRef(null);
  const canvasWrap = useRef(null);
  const resizeTimeout = useRef(null);

  const options = {
    backgroundColor: 0xffffff,
    antialiasing: true,
    resolution: 1,
    powerPreference: "high-performance",
  };

  const handleChange = (event) => {
    const { x, y } = event.nativeEvent;
    setCursorCoord({ x, y });
    // cursorRef.current = { x, y };
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
      <Stage
        className={"scene"}
        options={options}
        width={canvasWidth.width}
        height={canvasWidth.height}
        onMouseMove={handleChange}
      >
        <AppContext.Consumer>
          {(app) => {
            app.ticker.add((delta) => {
              // const mouseposition = app.renderer.plugins.interaction.mouse.global;
              // setCursorCoord(cursorRef.current);
            });

            return (
              <>
                {/* <Viewport app={app}> */}
                {/* <EventsCollector app={app}> */}
                {/* {({ ...eventsProps }) => { */}
                {/* return ( */}
                {/* <> */}
                <Text
                  x={200}
                  y={500}
                  style={{ color: 0x000000 }}
                  text={"text"}
                />
                <Circle
                  fill={0xfff}
                  x={cursorCoord?.x - 70 || 50}
                  y={cursorCoord?.y || 50}
                  radius={10}
                  id={6}
                  lineStyle={1}
                />
                {/* </> */}
                {/* ); */}
                {/* }} */}
                {/* </EventsCollector> */}
                {/* </Viewport> */}
              </>
            );
          }}
        </AppContext.Consumer>
      </Stage>
    </div>
  );
};
export default Canvas;
