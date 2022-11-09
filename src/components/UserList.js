import React, { useState } from "react";
import { Text, View, Dimensions } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function UserList({ List }) {


const windowWidth = Dimensions.get("window").width;

const OuterContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  margin: 10px auto;
  flex: 1;
  width: ${({ width }) => windowWidth - 40}px;
  /* height: 150px; */
  border: 1px;
  padding: 15px 20px;
`;

const Container = styled.View`
  flex-direction: row;
`;

const TitleText = styled.Text`
  flex: 1;
  font-size: 18px;
  line-height: 25px;
`;

const ValueText = styled.Text`
  flex: 2;
  font-size: 18px;
  line-height: 25px;
`;

  return (
    
      <OuterContainer>
      {List.map(({ id, productID, productName, produce, registration, detail, manager }) => (
      <Container>
        <TitleText>제품 ID : </TitleText>
        <ValueText>{productID}</ValueText>
      </Container>

      <Container>
        <TitleText>제품명 : </TitleText>
        <ValueText>{productName}</ValueText>
      </Container>
      
      <Container>
        <TitleText>제조일자 : </TitleText>
        <ValueText>{produce}</ValueText>
      </Container>

      <Container>
        <TitleText>등록일자 : </TitleText>
        <ValueText>{registration}</ValueText>
      </Container>
    ))}
    </OuterContainer>

  );
  
};

// export default UserList;
