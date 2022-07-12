import { Graphics } from "pixi.js";
import { CustomPIXIComponent } from "react-pixi-fiber";

export const behavior = {
  customDisplayObject: (props) => {
    const graphics = new Graphics();
    return graphics;
  },
  // did Updatae
  customApplyProps(instance, oldProps, newProps) {
    const {
      radius: oldradius,
      fill: oldFill,
      id: oldId,
      lineStyle: oldlineStyle,
      ...restOld
    } = oldProps;

    const { radius, fill, id, lineStyle = 0, ...restNew } = newProps;

    if (restNew.x !== restOld.x || restNew.y !== restOld.y) {
      instance.geometry.dispose();

      instance.clear();
      instance.lineStyle(lineStyle);
      instance.beginFill(fill);
  
      instance.drawCircle(0, 0, radius);
      instance.endFill();
      instance.name = "CIRCLE";

      instance.id = id;
    }
    this.applyDisplayObjectProps(restOld, restNew);
  },
  // unmount
  customWillDetach(instance) {
    // console.log("UNMOUNT");
  },
};

const Circle = ({ ...props }) => {
  const CircleConstructor = CustomPIXIComponent(behavior, "CIRCLE");

  return <CircleConstructor {...props} />;
};

export default Circle;
