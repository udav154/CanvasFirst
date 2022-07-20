import { useEffect, useState, useRef } from "react";
import { Point, Texture, SimpleRope, BLEND_MODES } from "pixi.js";
import { cubicInterpolation } from "utils";
import { trail } from "@assets";

const TrailCursor = ({ app, children, ...props }) => {
  const historyX = [];
  const historyY = [];
  const points = [];
  const ropeSize = 100;
  const historySize = 20;
  const trailTexture = Texture.from(trail);

  for (let i = 0; i < historySize; i++) {
    historyX.push(0);
    historyY.push(0);
  }

  for (let i = 0; i < ropeSize; i++) {
    points.push(new Point(0, 0));
  }

  const rope = new SimpleRope(trailTexture, points);

  rope.blendmode = BLEND_MODES.ADD;

  useEffect(() => {
    app.stage.addChild(rope);
    app.ticker.add((delta) => {
      const mouseposition = app.renderer.plugins.interaction.mouse.global;

      historyX.pop();
      historyX.unshift(mouseposition.x);
      historyY.pop();
      historyY.unshift(mouseposition.y);
      for (let i = 0; i < ropeSize; i++) {
        const p = points[i];

        const ix = cubicInterpolation(historyX, (i / ropeSize) * historySize);
        const iy = cubicInterpolation(historyY, (i / ropeSize) * historySize);

        p.x = ix;
        p.y = iy;
      }
    });
  }, []);

  return null;
};

export default TrailCursor;
