import React, { useState, useRef } from "react";
import { Text, View, Dimensions, ScrollView } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function UserList({ users }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [showModal, setShowModal] = useState(false); // 모달창이 보이고 안보이는 상태관리
  const [activeObject, setActiveObject] = useState(null); // 모달창에 들어갈 리스트 내용 요소
  // 기본으로는 모달창이 보이지 않기 때문에 아무것도 없는 null상태

  const Modal = ({ object: { id, productID, name, produce, registration, detail, manager, onRemove }}) => {

      const [ editing, setEditing ] = useState({     // 기존값 들고 와서 수정 시 값이 바뀌는걸 반영해줌
        id: id,      // 기준값
        productID: productID,
        productName: productName,
        produce: produce,
        registration: registration,
        detail: detail,
        manager: manager,
      })

      const _handleChange = (e) => {
        const {name, value} = e.target
        setEditing(pre => {
          return {
            ...pre,
            [ name ]: value
          }
        })
      }    

      const ModalFilter = styled.View`
        position: absolute;
        width: ${windowWidth};
        height: ${windowHeight};
        background-color: gray;
        opacity: 0.5;
      `;

      const Modalwindow = styled.View`
        position: absolute;
        width: ${({ width }) => windowWidth - 60}px;
        height: ${({ height }) => windowHeight - 100}px;
        background-color: white;
        margin-left: 30px;
        margin-top: 30px;

        border: 1px solid #333;
      `;

      return (
        // 모달창 표시 부분
        <>
          <ModalFilter />
          <Modalwindow>
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
          </Modalwindow>
        </>
      );
    };

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
    <>
      {users.map(
        ({
          id,
          productID,
          productName,
          produce,
          registration,
          detail,
          manager,
        }) => (
          <OuterContainer
            key={id}
            onPress={() => {
              console.log("리스트 클릭");
              console.log(`ID: ${id}모달 열림`);
              // setActiveObject({ id, productID, name, produce, registration, detail, manager, onRemove, onUpdate // onChange,
              // });    // 모달창에 들어갈 리스트에 포함된 내용&이벤트 요소 : 원래값 null 이다가 오픈할때 내용 속성값들 받아옴
              setShowModal(true);
            }}
          >
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

      <Modal object={activeObject} />
      
      {/* // 수정버튼 클릭 이벤트 */}

      {/* {showModal ? (
        <Modal object={activeObject} onAccept={handleToggleEdit} />
      ) : null} */}

      {/* 모달창 표시 부분 : 상태관리를 통해 노출 결정 */}
      {/* // 모달창에 들어갈 리스트 내용 요소 */}
    </>
  );
}

// export default UserList;
