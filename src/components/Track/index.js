import React, { useRef, useState, useEffect } from "react";
import { Graphics } from "pixi.js";
import { CustomPIXIComponent } from "react-pixi-fiber";

const TYPE = "TRACK";

export const behavior = {
  customDisplayObject: (props) => new Graphics(),
  customApplyProps: function (instance, oldProps = {}, newProps = {}) {
    const {
      fill,
      lineStyle = 0,
      alpha = 1,
      coords,
      radius = 3,
      ...restNew
    } = newProps;
    if (oldProps !== undefined) {
      instance.clear();
      instance.geometry.dispose();
    }

    instance.moveTo(coords[0][0].x, coords[0][0].y);
    instance.lineStyle(1, 0x000000);
    
    for (let i = 0; i < coords.length; i++) {
      instance.lineTo(coords[i][0].x, coords[i][0].y);

      instance.beginFill(0xff0000, 1);
      instance.drawCircle(coords[i][0].x, coords[i][0].y, radius);
      instance.beginFill(0x000000, 0);
      instance.drawCircle(coords[i][0].x, coords[i][0].y, coords[i][3]);
    }
    instance.endFill();

    // this.applyDisplayObjectProps(oldProps, restNew);
  },
};

const Track = ({ ...props }) => {
  const TrackConstructor = CustomPIXIComponent(behavior, TYPE);

  return <TrackConstructor {...props} />;
};

export default Track;
