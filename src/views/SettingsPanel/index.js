import React from "react";
import style from "./index.module.scss";
import { IconView } from "@viwes";

const SettingsPanel = ({
  isInputOpen,
  text,
  handleTogleInput,
  handleClearInput,
  handleChangeText,
  ...props
}) => {
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (isInputOpen) {
      inputRef.current.focus();
    }
  }, [isInputOpen]);

  return (
    <>
      <div className={style["setting_wrap"]}>
        {/* <div className={style.input_wrap} open={isInputOpen}>
          <div className={style.input_wrapper}>
            <input
              ref={inputRef}
              type="text"
              value={text}
              className={style.input_custom}
              placeholder="placeholder"
              onChange={handleChangeText}
            />
            <button className={style.input_clear} onClick={handleClearInput}>
              <IconView iconType="close" />
            </button>
            <button className={style.input_hide} onClick={handleTogleInput}>
              <IconView iconType="arrow" />
            </button>
          </div>

          <button
            type="button"
            className={style.btn_custom}
            onClick={handleTogleInput}
          >
            <IconView iconType="search" />
          </button>
        </div> */}




          <button
            type="button"
            className={style.btn_open}
            onClick={handleTogleInput}
            disabled={isInputOpen}
          >
            <IconView iconType="search" />
          </button>

         <div className={style.input_wrap1} open={isInputOpen}>
            <input
              ref={inputRef}
              type="text"
              value={text}
              className={style.input_custom}
              placeholder="placeholder"
              onChange={handleChangeText}
            />
            <button className={style.input_clear} onClick={handleClearInput}>
              <IconView iconType="close" />
            </button>
            <button className={style.input_hide} onClick={handleTogleInput}>
              <IconView iconType="arrow" />
            </button>

        </div>
      </div>
    </>
  );
};

export default SettingsPanel;
