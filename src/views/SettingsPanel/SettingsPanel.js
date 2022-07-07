import React from "react";
import style from "./index.module.scss";

const SettingsPanel = ({
  isInputOpen,
  text,
  handleTogleInput,
  handleChangeText,
  ...props
}) => {
  return (
    <>
      <div className={style["setting_wrap"]}>
        Settings Panel
      
        {/* <button class={style["setting__btn-write"]} onClick={handleTogleInput}>
          BTN
        </button>
        <input
          className={
            isInputOpen
              ? style["setting__input--open"]
              : style["setting__input"]
          }
          onChange={handleChangeText}
          value={text}
        ></input> */}
      </div>
    </>
  );
};

export default SettingsPanel;
