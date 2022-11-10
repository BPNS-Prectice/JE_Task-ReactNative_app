import React, { useState } from "react";
import { Text, View, Dimensions, ScrollView } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function UserList() {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get('window').height;

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

  const [List, setList] = useState([
    {
      id: 1,
      productID: "BPSOLUTION01",
      productName: "제품명01",
      produce: "2022-09-01",
      registration: "2022-09-01",
      detail:
        "상세설명01 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quod!",
      manager: "홍길동",
    },
    {
      id: 2,
      productID: "BPSOLUTION02",
      productName: "제품명02",
      produce: "2022-09-02",
      registration: "2022-09-02",
      detail:
        "상세설명02 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed minima quisquam quia.",
      manager: "아인슈타인",
    },
    {
      id: 3,
      productID: "BPSOLUTION03",
      productName: "제품명03",
      produce: "2022-09-03",
      registration: "2022-09-03",
      detail:
        "상세설명03 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, quis corrupti.",
      manager: "엘렌워커",
    },
    {
      id: 4,
      productID: "BPSOLUTION04",
      productName: "제품명04",
      produce: "2022-09-04",
      registration: "2022-09-04",
      detail:
        "상세설명04 Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi.",
      manager: "윤동주",
    },
    {
      id: 4,
      productID: "BPSOLUTION04",
      productName: "제품명04",
      produce: "2022-09-04",
      registration: "2022-09-04",
      detail:
        "상세설명04 Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi.",
      manager: "윤동주",
    },
    {
      id: 4,
      productID: "BPSOLUTION04",
      productName: "제품명04",
      produce: "2022-09-04",
      registration: "2022-09-04",
      detail:
        "상세설명04 Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi.",
      manager: "윤동주",
    },
  ]);
 

  return (
    <>
      {List.map(
        ({
          id,
          productID,
          productName,
          produce,
          registration,
          detail,
          manager,
        }) => (
          <OuterContainer>
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
            </OuterContainer>
        )
      )}
   </>
  );
}

// export default UserList;
