import React from "react";
import { SettingsSide, AsyncComponent } from "@components";
import { Wrapper } from "@viwes";

const AsyncCanvas = AsyncComponent(() => {
  return import("../components/Canvas");
});

const MainPage = () => {
  return (
    <>
    <Wrapper variant={'page_wrap'} >
      <SettingsSide />
      <AsyncCanvas />
    </Wrapper>
    </>
  );
};
export default MainPage;
