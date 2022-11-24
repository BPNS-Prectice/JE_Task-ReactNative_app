import React, { useState, useRef } from "react";
import { Text, View, Dimensions, ScrollView, Alert } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
// import NewButton from "./NewModal";
import ListModal from "./ListModal";

export default function UserList({ users, onUpdate, onRemove }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [showModal, setShowModal] = useState(false); // 리스트 모달창이 보이고 안보이는 상태관리
  const [activeObject, setActiveObject] = useState(null); // 모달창에 들어갈 리스트 내용 요소-기본적으로 모달창이 보이지 않기 때문에 아무것도 없는 null상태

  const OuterContainer = styled.Pressable`
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

  const onModalClose = () => {
    setShowModal(false);
  };

  const handleEditing = (event, data) => {
    onUpdate(data.id, {
      productID: data.productID,
      productName: data.productName,
      produce: data.produce,
      registration: data.registration,
      detail: data.detail,
      manager: data.manager,
    });
    setActiveObject((pre) => ({
      ...pre, // 일단 전체 내용을 다 불러오고**
      productID: data.productID, // 그 중에 바뀐 값을 업데이트 한다
      productName: data.productName,
      produce: data.produce,
      registration: data.registration,
      detail: data.detail,
      manager: data.manager,
    })); // 모달창의 값을 업데이트
    alert("수정되었습니다");
    // setEditingMode(!editingMode);
  };



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
              console.log(`(ID:${id}) 모달 열림`);
              setActiveObject({
                id,
                productID,
                productName,
                produce,
                registration,
                detail,
                manager, 
                onUpdate,
                onRemove, 
                // _handleChange,
                // onChange,
              }); // 모달창에 들어갈 리스트에 포함된 내용&이벤트 요소 : 원래값 null이다가 오픈할때 내용 속성값들 받아옴
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

      {showModal ? (                  // 모달창 표시 부분 : 상태관리를 통해 노출 결정
        <ListModal
          onModalClose={onModalClose} // 모달창 닫기(+회색 배경 포함)
          object={activeObject}       // 모달창에 들어갈 리스트 내용 요소
          onAccept={handleEditing}    // 수정버튼 클릭 이벤트
          onRemove={onRemove}         // 인풋창 비우기
        />
      ) : null}

       
    </>
  );
}

// export default UserList;