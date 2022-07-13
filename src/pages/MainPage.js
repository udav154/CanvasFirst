import React from "react";
import { SettingsSide, Canvas, AsyncComponent } from "@components";
import { Wrapper } from "@viwes";

const AsyncCanvas = AsyncComponent(() => {
  return import("../components/Canvas");
});

const MainPage = () => {
  const [text, setText] = React.useState('')

  const handleChangeText = (e) => {
    e.preventDefault()
    setText(e.target.value)
  }

  const handleClearInput = () => {
    setText('')
  }

  return (
    <>
    <Wrapper variant={'page_wrap'} >
      <SettingsSide text={text} handleChangeText={handleChangeText} handleClearInput={handleClearInput}/>
      <AsyncCanvas  text={text}/>
      {/* <Canvas  text={text}/> */}
    </Wrapper>
    </>
  );
};
export default MainPage;
