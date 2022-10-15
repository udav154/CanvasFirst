import React, { useState, useEffect, useRef } from "react";

const CanvasLayout = ({ children, ...props }) => {
  const [cursorPoint, setcursorPoint] = useState({});
  const [trailCursor, settrailCursor] = useState([]);
  const [trailDrawPoints, settrailDrawPoints] = useState([]);
  const maxtrailPoints = 200;
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
    const point = { x: Math.round(x - 70), y: Math.round(y) };
    if (cursorPoint.x === point.x && cursorPoint.y === point.y) return;
    setcursorPoint(point);
  };

  const handleMouseMove = (event) => {
    const { x, y } = event.nativeEvent;
    setCursor(event.nativeEvent);
  };

  const circleCircle = (x1, y1, x2, y2, r1, r2) => {
    var x = x1 - x2;
    var y = y2 - y1;
    var radii = r1 + r2;
    return x * x + y * y <= radii * radii;
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
    const vecLength = getVecLength(p1, p2);
    const x = (p2.x - p1.x) / vecLength;
    const y = (p2.y - p1.y) / vecLength;
    return { x, y };
  };

  const unNormalizeVector = (startVec, normVec, radius) => {
    return {
      x: Math.round(startVec.x + normVec.x * radius),
      y: Math.round(startVec.y + normVec.y * radius),
    };
  };

  const getPointsRotatedVector = (vec) => {
    const v1 = { x: vec.y, y: -vec.x };
    const v2 = { x: -vec.y, y: vec.x };
    return [v1, v2];
  };

  const getCosSinVectors = (p1, p2) => {
    const cos =
      (p1.x * p2.x + p1.y * p2.y) /
      (Math.sqrt(p1.x ** 2 + p1.y ** 2) * Math.sqrt(p2.x ** 2 + p2.y ** 2));
    const sin = Math.sqrt(1 - cos ** 2);
    return { cos, sin };
  };

  const addPointToTrail = (oldTrail, newPoint) => {
    if (oldTrail.length >= maxtrailPoints) {
      return lifoArr(newPoint, oldTrail, maxtrailPoints);
    } else {
      return customUnShift(newPoint, oldTrail);
    }
  };

  const getPerpendicularPointsOfVector = (p1, p2, radius) => {
    const normalVec = getNormalizeVecor(p1, p2);
    const pointsRotated = getPointsRotatedVector(normalVec);
    const unnormPoints = pointsRotated.map((el) =>
      unNormalizeVector(p1, el, radius)
    );
    return unnormPoints;
  };

  const getDataPoint = (p1, p2, radius) => {
    const sidePoints = getPerpendicularPointsOfVector(p1, p2, radius);
    return [p1, ...sidePoints, radius];
  };

  const getDataPointByCosAngle = (p1, p2, radius, sin, cos) => {

  };

  const filterPointsTrack = (pointsTrack) => {
    const countPoints = pointsTrack.length;
    const delta = circleRadius / (countPoints - 1);
    let currentCircleIdx = 0;
    let radiusCurrCircle = circleRadius;
    let filtredPointsTrack = [pointsTrack[0]];
    for (let i = 1; i < countPoints; i++) {
      const radius = delta * (countPoints - i);
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
      filtredPointsTrack[filtredPointsTrack.length] = pointsTrack[i];
    }
    return filtredPointsTrack;
  };

  const fillTrailData = (pointsTrack) => {
    const countPoints = pointsTrack.length;
    const delta = circleRadius / (countPoints - 1);
    const trackPointsAndRadius = [
      getDataPoint(pointsTrack[0], pointsTrack?.[1], circleRadius),
    ];
    for (let i = 1; i < countPoints - 1; i++) {
      const radius = Math.round(delta * (countPoints - i));
      const v1 = getNormalizeVecor(pointsTrack[i - 1], pointsTrack[i]);
      const v2 = getNormalizeVecor(pointsTrack[i], pointsTrack[i + 1]);
      const { cos, sin } = getCosSinVectors(v1, v2);
      const {cos1, sin1} =  getCosSinVectors({x:0, y:1},{x:0, y:-1}); 
      let p1Rot
      let p2Rot 
      if (cos1 > 0 ) {

      }
      const p1Rotated = {
        x: (v2.x *(cos) - v2.y * (sin)),
        y: v2.x * (sin) + v2.y * (cos),
      };
      const p2Rotated = {
        x:( v1.x * cos - v1.y * sin),
        y: (v1.x * sin + v1.y * cos),
      };
      const newPointData = [pointsTrack[i],unNormalizeVector(pointsTrack[i], p1Rotated,radius), unNormalizeVector(pointsTrack[i], p2Rotated,radius), radius ]
      trackPointsAndRadius[trackPointsAndRadius.length] = newPointData;
    }
    trackPointsAndRadius[trackPointsAndRadius.length] = [
      pointsTrack[pointsTrack.length - 1],
      pointsTrack[pointsTrack.length - 1],
      pointsTrack[pointsTrack.length - 1],
      1,
    ];
    // if (trackPointsAndRadius.length === 2) debuggerasd;
    return trackPointsAndRadius;
  };

  useEffect(() => {
    if (trailCursor.length > 2) {
      const filtredPoints = filterPointsTrack(trailCursor);
      if (filtredPoints.length < 2) return;
      settrailDrawPoints((prevState) => fillTrailData(filtredPoints));
    }
  }, [trailCursor]);

  useEffect(() => {
    if (!cursorPoint.x) return;
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
