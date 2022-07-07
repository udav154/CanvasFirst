import React from "react";
import { SettingsPanel } from "@viwes";

const SettingsSide = ({ ...props }) => {
  const [isInputOpen, setisInputOpen] = React.useState(false);

  const handleTogleInput = () => {
    setisInputOpen(!isInputOpen);
  };

  return (
    <>
      <SettingsPanel isInputOpen={isInputOpen} handleTogleInput={handleTogleInput} {...props} />
    </>
  );
};

export default SettingsSide;
