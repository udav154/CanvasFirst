import React, { useState, useEffect, useRef } from "react";

const CanvasLayout = ({ children, ...props }) => {
  const [cursorPoint, setcursorPoint] = useState({});
  const [trailCursor, settrailCursor] = useState([]);
  const [trailDrawPoints, settrailDrawPoints] = useState([]);
  const maxtrailPoints = 40;
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
    const point = { x: Math.round(x-70), y: Math.round(y) };
    if (cursorPoint.x === point.x && cursorPoint.y === point.y) return;
    setcursorPoint(point);
  };

  const handleMouseMove = (event) => {
    const { x, y } = event.nativeEvent;
    setCursor(event.nativeEvent);
  };

  const getCenterVector = (p1, p2) => {
    const x = (p2.x + p1.x) / 2;
    const y = (p2.y + p1.y) / 2;
    return { x, y };
  };

  const getVecLength = (p1, p2) => {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
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
    return {
      x: Math.round(startVec.x + normVec.x),
      y: Math.round(startVec.y + normVec.y),
    };
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

  const addPointToTrail = (oldTrail, newPoint) => {
    if (oldTrail.length >= maxtrailPoints) {
      return lifoArr(newPoint, oldTrail, maxtrailPoints);
    } else {
      return customUnShift(newPoint, oldTrail);
    }
  };

  const circleCircle = (x1, y1, x2, y2, r1, r2) => {
    var x = x1 - x2;
    var y = y2 - y1;
    var radii = r1 + r2;
    return x * x + y * y <= radii * radii;
  };

  const getDataPoint = (p1, p2, radius) => {
    const sidePoints = getPerpendicularPointsOfVector(
      p1,
      p2,
      radius
    );
    return [p1, ...sidePoints, radius];
  };

  const fillTrailData = (pointsTrack) => {
    const countPoints = pointsTrack.length;
    const delta = circleRadius / (countPoints - 1);
    let currentCircleIdx = 0;
    let radiusCurrCircle = circleRadius;
    const trackPointsAndRadius = [getDataPoint(pointsTrack[0], pointsTrack?.[1], circleRadius)];

    for (let i = 0; i < countPoints; i++) {
      const radius = Math.round(delta * (countPoints - i));
      const iscollision = circleCircle(
        pointsTrack[currentCircleIdx].x,
        pointsTrack[currentCircleIdx].y,
        pointsTrack[i].x,
        pointsTrack[i].y,
        radiusCurrCircle,
        radius
      );
      if (iscollision) {
        continue;
      }
      currentCircleIdx = i;
      const newPointData = getDataPoint(pointsTrack[i], pointsTrack?.[i + 1] || pointsTrack?.[i - 1], radius)
      // const sidePoints = getPerpendicularPointsOfVector(
      //   pointsTrack[i],
      //   pointsTrack?.[i + 1] || pointsTrack?.[i - 1],
      //   radius
      // );
      // const pointData = [pointsTrack[i], ...sidePoints, radius];
      trackPointsAndRadius[trackPointsAndRadius.length] = newPointData;
    }
    trackPointsAndRadius[trackPointsAndRadius.length] = [pointsTrack[pointsTrack.length-1], pointsTrack[pointsTrack.length-1],pointsTrack[pointsTrack.length-1],0];
    return trackPointsAndRadius;
  };

  useEffect(() => {
    if (trailCursor.length > 2) {
      settrailDrawPoints((prevState) => fillTrailData(trailCursor));
    }
  }, [trailCursor]);

  useEffect(() => {
    if (!cursorPoint.x) return  
    settrailCursor((prevstate) => addPointToTrail(prevstate, cursorPoint));
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
