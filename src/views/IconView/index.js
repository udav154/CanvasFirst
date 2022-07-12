import { icons } from "./iconsObj";

const Icon = ({ iconType = "default" }) => {
  const svgHtml = icons[iconType];
  return svgHtml;
};

export default Icon;
