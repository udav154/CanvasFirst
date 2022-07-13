import { CustomPIXIComponent } from "react-pixi-fiber";
import { Viewport } from "pixi-viewport";

const behavior = {
  customDisplayObject: (props) => {
    const viewport = new Viewport({
      screenWidth: props.app.renderer.width,
      screenHeight: props.app.renderer.height,
      passiveWheel: true,
      interaction: props.app.renderer.plugins.interaction,
    })
      .pinch()
      .decelerate({
        friction: 0,
      })

    // viewport.fit();
    return viewport;
  },
  customApplyProps(instance, oldProps, newProps) {
    const {
      isMoovingCenter: oldisMoovingCenter,
      setisMoovingCenter: oldsetisMoovingCenter,
      pause: pauseOld,
      zoomScale: zoomScaleOld,
      setZoomScale: oldsetZoomScale,
      ...restOld
    } = oldProps;
    const {
      isMoovingCenter = false,
      setisMoovingCenter = () => {},
      pause,
      zoomScale = 1,
      setZoomScale = () => {},
      ...restNew
    } = newProps;

    this.applyDisplayObjectProps(restOld, restNew);
  },
};

export default CustomPIXIComponent(behavior, "VIEWPORT");
