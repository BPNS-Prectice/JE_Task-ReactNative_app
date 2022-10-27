import React from "react";
import styled from "styled-components";

const Container = styled.View`
  position: absolute;
  z-index: 2;
  opacity: 0.3;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: ${({ theme }) => theme.spinnerBackground};
`;


const Indicator = styled.ActivityIndicator.attrs(({ theme }) => ({
                      // ActivityIndicator: ReactNative공식 등록된 로딩 표시기 태그
  size: "large",
  color: theme.spinnerIndicator,
}))``;

const Spinner = () => {
  return (
    <Container>
      <Indicator />
    </Container>
  );
};

export default Spinner;
