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

    const t = 1;
    instance.lineStyle(1, 0x0fff00);
    instance.moveTo(coords[0][1].x, coords[0][1].y);
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = i > 0 ? coords[i - 1][1] : coords[0][1];
      const p1 = coords[i][1];
      const p2 = coords[i + 1][1];
      const p3 = i !== coords.length - 2 ? coords[i + 2][1] : p2;

      const cp1x = p1.x + ((p2.x - p0.x) / 6) * t;
      const cp1y = p1.y + ((p2.y - p0.y) / 6) * t;

      const cp2x = p2.x - ((p3.x - p1.x) / 6) * t;
      const cp2y = p2.y - ((p3.y - p1.y) / 6) * t;

      instance.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }

    for (let i = 0; i < coords.length - 1; i++) {
      instance.beginFill(0x49ff00);
      instance.drawCircle(coords[i][1].x, coords[i][1].y, 4);
    }
    instance.endFill();

    const reversed = [...coords].reverse();
    instance.moveTo(reversed[0][2].x, reversed[0][2].y);

    instance.lineStyle(1, 0x0023ff);
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = i > 0 ? reversed[i - 1][2] : reversed[0][2];
      const p1 = reversed[i][2];
      const p2 = reversed[i + 1][2];
      const p3 = i !== reversed.length - 2 ? reversed[i + 2][2] : p2;

      const cp1x = p1.x + ((p2.x - p0.x) / 6) * t;
      const cp1y = p1.y + ((p2.y - p0.y) / 6) * t;

      const cp2x = p2.x - ((p3.x - p1.x) / 6) * t;
      const cp2y = p2.y - ((p3.y - p1.y) / 6) * t;

      instance.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }


    for (let i = 0; i < coords.length - 1; i++) {
      instance.beginFill(0x0023ff);
      instance.drawCircle(coords[i][2].x, coords[i][2].y, 3);
    }
    instance.endFill();
    //!   instance.moveTo(coords[0][1].x , coords[0][1].y);
    //!   instance.lineStyle(1, 0x49FF00);
    //!   for (let i = 0; i < coords.length - 1; i++) {
    //!   instance.lineTo(coords[i][1].x , coords[i][1].y);

    //!   instance.beginFill(0x49FF00);
    //!   instance.drawCircle(coords[i][1].x , coords[i][1].y, 3);
    //!   }
    //!   instance.lineStyle(1, 0x0023ff);
    //!   for (let i = coords.length - 1; i > -1; i--) {
    //!   instance.lineTo(coords[i][2].x , coords[i][2].y);

    //!   instance.beginFill(0x0023ff);
    //!   instance.drawCircle(coords[i][2].x , coords[i][2].y, 3);
    //!   }
    //!    instance.endFill();
    // instance.lineTo(coords[0][0].x , coords[0][0].y);
    // instance.endFill();
    // this.applyDisplayObjectProps(oldProps, restNew);
  },
};

const CustomTrail = ({ ...props }) => {
  const CustomTrailConstructor = CustomPIXIComponent(behavior, TYPE);

  return <CustomTrailConstructor {...props} />;
};

export default CustomTrail;
