import { useEffect, useState, useRef } from "react";
import { Graphics, Container } from "pixi.js";

const CursorCircle = ({ app, children, ...props }) => {
  const radius = 20;

  useEffect(() => {
    app.ticker.add((delta) => {
      const oldCircle = app.stage.children.find((el) => el.name === "CIRCLE");
      if (oldCircle) app.stage.removeChild(oldCircle);

      const mouseposition = app.renderer.plugins.interaction.mouse.global;
      let { x, y } = mouseposition;
      if (x < 0) x = 0;
      if (y < 0) y = 0;

      const graphics = new Graphics();
      graphics.name = "CIRCLE";
      graphics.alpha = 0.7;
      graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
      graphics.beginFill(0xffffff, 1);
      graphics.drawCircle(x, y, radius);
      graphics.endFill();

      app.stage.addChild(graphics);
    });
  }, []);

  return null;
};

export default CursorCircle;
