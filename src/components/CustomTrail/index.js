import React, { useRef, useState, useEffect } from "react";
import { Graphics } from "pixi.js";
import { CustomPIXIComponent } from "react-pixi-fiber";

const TYPE = "CustomTrail";

export const behavior = {
  customDisplayObject: (props) => new Graphics(),
  customApplyProps: function (instance, oldProps = {}, newProps = {}) {
    const { fill, lineStyle = 0, alpha = 1, coords, ...restNew } = newProps;
    if (oldProps !== undefined) {
      instance.clear();
      instance.geometry.dispose();
    }
    instance.lineStyle(1, fill);
    // instance.beginFill(0xfff, 0.3);
    instance.moveTo(coords[0][0].x - 70, coords[0][0].y);
    instance.lineTo(coords[0][0].x - 70, coords[0][0].y);
    for (let i = 1; i < coords.length-2; i=i+3) {
      instance.bezierCurveTo(coords[i][0].x - 70, coords[i][0].y, coords[i+1][0].x - 70, coords[i+1][0].y,   coords[i+2][0].x - 70, coords[i+2][0].y)
      // instance.quadraticCurveTo(coords[i][0].x - 70, coords[i][0].y, coords[i+1][0].x - 70, coords[i+1][0].y)
      // instance.lineTo(coords[i][0].x - 70, coords[i][0].y);
    }
    for (let i = coords.length - 2; i > 1; i=i-3) {
      instance.bezierCurveTo(coords[i][1].x - 70, coords[i][1].y, coords[i-1][1].x - 70, coords[i-1][1].y,   coords[i-2][1].x - 70, coords[i-2][1].y)
      // instance.quadraticCurveTo(coords[i][1].x - 70, coords[i][1].y, coords[i-1][1].x - 70, coords[i-1][1].y)
      // instance.lineTo(coords[i][1].x - 70, coords[i][1].y);
    }
    instance.lineTo(coords[0][0].x - 70, coords[0][0].y);
    // instance.endFill();
    // this.applyDisplayObjectProps(oldProps, restNew);
  },
};

const CustomTrail = ({ ...props }) => {
  const CustomTrailConstructor = CustomPIXIComponent(behavior, TYPE);

  return <CustomTrailConstructor {...props} />;
};

export default CustomTrail;
