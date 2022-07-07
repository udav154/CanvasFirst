import React from "react";
import { SettingsSide, AsyncComponent } from "@components";
import { Wrapper } from "@viwes";

const AsyncCanvas = AsyncComponent(() => {
  return import("../components/Canvas");
});

const MainPage = () => {
  const [text, setText] = React.useState('')

  const handleChangeText = (e) => {
    setText(e.target.value)
  }

  return (
    <>
    <Wrapper variant={'page_wrap'} >
      <SettingsSide text={text} handleChangeText={handleChangeText} />
      <AsyncCanvas  text={text}/>
    </Wrapper>
    </>
  );
};
export default MainPage;
