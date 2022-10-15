import React, { useRef, useState, useEffect } from "react";
import { Graphics } from "pixi.js";
import { CustomPIXIComponent } from "react-pixi-fiber";

const TYPE = "CIRCLE";

export const behavior = {
  customDisplayObject: (props) => new Graphics(),
  customApplyProps: function (instance, oldProps = {}, newProps = {}) {
    const {
      radius,
      fill,
      lineStyle = 0,
      id,
      alpha=1,
      x = 0,
      y = 0,
      ...restNew
    } = newProps;
    if (oldProps !== undefined) {
      instance.clear();
      instance.geometry.dispose()
    }
    instance.alpha = alpha;
    instance.beginFill(fill);
    instance.drawCircle(x, y, radius);
    instance.endFill();

    // this.applyDisplayObjectProps(oldProps, restNew);
  },
};

const Circle = ({ ...props }) => {

  const CircleConstructor = CustomPIXIComponent(behavior, TYPE);

  return <CircleConstructor {...props} />;
};

export default Circle;
