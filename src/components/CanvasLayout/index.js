import React, { useState, useEffect, useRef } from "react";

const CanvasLayout = ({ children, ...props }) => {
  const [cursorPoint, setcursorPoint] = useState({ x: 100, y: 100 });
  const [trailCursor, settrailCursor] = useState([]);
  const [trailDrawPoints, settrailDrawPoints] = useState([]);
  const maxtrailPoints = 50;
  const circleRadius = 50;

  const lifoArr = (element, arr, maxCount) => {
    const res = [element];
    for (let i = 1; i < maxCount; i++) {
      res[i] = arr[i - 1];
    }
    return res;
  };

  const customUnShift = (element, arr) => {
    const countiteration = arr.length + 1;
    const res = new Array(countiteration);
    res[0] = element;
    for (let i = 1; i < countiteration; i++) {
      res[i] = arr[i - 1];
    }
    return res;
  };

  const setCursor = ({ x, y }) => {
    const point = { x: Math.round(x), y: Math.round(y) };
    if (cursorPoint.x === point.x && cursorPoint.y === point.y) return;
    setcursorPoint(point);
  };

  const handleMouseMove = (event) => {
    const { x, y } = event.nativeEvent;
    setCursor(event.nativeEvent);
  };

  const getVecLength = (p1, p2) => {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  };

  const getCenterVector = (p1, p2) => {
    const x = (p2.x + p1.x) / 2;
    const y = (p2.y + p1.y) / 2;
    return { x, y };
  };

  const getNormalizeVecor = (p1, p2) => {
    const x = p2.x - p1.x;
    const y = p2.y - p1.y;
    return { x, y };
  };

  const getUnitVector = (normalVec, vecLength) => {
    return {
      x: normalVec.x / vecLength,
      y: normalVec.y / vecLength,
    };
  };

  const getPointsRotatedVector = (vec) => {
    const v1 = { x: vec.y, y: -vec.x };
    const v2 = { x: -vec.y, y: vec.x };
    return [v1, v2];
  };

  const unUnitVector = (vec, vecLength) => {
    return { x: vec.x * vecLength, y: vec.y * vecLength };
  };

  const unNormalizeVector = (startVec, normVec) => {
    return { x: startVec.x + normVec.x, y: startVec.y + normVec.y };
  };

  const getPerpendicularPointsOfVector = (p1, p2, length) => {
    const lengthVec = getVecLength(p1, p2);
    const normalVec = getNormalizeVecor(p1, p2);
    const unitNormalVec = getUnitVector(normalVec, lengthVec);
    const pointsRotated = getPointsRotatedVector(unitNormalVec);
    const ununitPointsRotated = pointsRotated.map((el) =>
      unUnitVector(el, length)
    );
    const unnormPoints = ununitPointsRotated.map((el) =>
      unNormalizeVector(p1, el)
    );
    return unnormPoints;
  };

  useEffect(() => {
    const countPoint = trailCursor.length;
    if (countPoint < 2) {
    } else {
      const delta = circleRadius / (countPoint - 1);
      const data = trailCursor.map((el, idx, arr) => {
        if (idx === 0)
          return getPerpendicularPointsOfVector(el, arr[1], circleRadius);
        if (idx === arr.length - 1) return [el, el];
        return getPerpendicularPointsOfVector(
          el,
          arr[idx + 1],
          Math.round(delta * (countPoint - idx))
        );
      });
      settrailDrawPoints(data);
    }
  }, [trailCursor]);

  useEffect(() => {
    if (trailCursor.length >= maxtrailPoints) {
      settrailCursor((prevstate) =>
        lifoArr(cursorPoint, prevstate, maxtrailPoints)
      );
    } else {
      settrailCursor((prevstate) => customUnShift(cursorPoint, prevstate));
    }
  }, [cursorPoint]);

  return children({
    circleRadius,
    cursorPoint,
    trailDrawPoints,
    handleMouseMove,
    ...props,
  });
};

export default CanvasLayout;
