import React, { useState, useRef } from "react";
import { Text, View, Dimensions, ScrollView } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";

function User({ user }) {
// function User({ productID, productName, produce, registration }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

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
      <Container>
        <TitleText>제품 ID : </TitleText>
        <ValueText>{user.productID}</ValueText>
        {/* <ValueText>{productID}</ValueText> */}
      </Container>

      <Container>
        <TitleText>제품명 : </TitleText>
        <ValueText>{user.productName}</ValueText>
        {/* <ValueText>{productName}</ValueText> */}
      </Container>

      <Container>
        <TitleText>제조일자 : </TitleText>
        <ValueText>{user.produce}</ValueText>
        {/* <ValueText>{produce}</ValueText> */}
      </Container>

      <Container>
        <TitleText>등록일자 : </TitleText>
        <ValueText>{user.registration}</ValueText>
        {/* <ValueText>{registration}</ValueText> */}
      </Container>
    </OuterContainer>
  );
}

export default function UserList({ users }) {
  return (
    <>
      {/* {users.map((user, { productID, productName, produce, registration }) => ( */}
      {users.map((user) => (
        // <User user={user} key={user.id} />
        <User
          user={user}
          key={user.id}
          // productID={user.productID}
          // productName={user.productName}
          // produce={user.produce}
          // registration={user.registration}
        />
      ))}
    </>
  );
}

