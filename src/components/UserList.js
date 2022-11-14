import React, { useState } from "react";
import { Dimensions, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";

export default function UserList({ users, onRemove, onUpdate }) {
  // 부모컴포넌트에서 const 로 선언했던 객체 정보 받아오기(props)

  const [showModal, setShowModal] = useState(false); // 모달창이 보이고 안보이는 상태관리
  const [activeObject, setActiveObject] = useState(null); // 모달창에 들어갈 리스트 내용 요소
  // 기본으로는 모달창이 보이지 않기 때문에 아무것도 없는 null상태

  const [editingMode, setEditingMode] = useState(false); // 수정모드에 진입했는지 여부 (수정버튼 클릭 시)
  const [editingInputs, setEditingInputs] = useState(users, {
    // 수정값 반영 요소들 // 수정 상태 입력 폼
    productID: "",
    name: "",
    produce: "",
    registration: "",
    detail: "",
    manager: "",
  });

  const { name, produce, registration, detail, manager } = editingInputs; // set으로만 이용되고 초기값은 사용되는 곳이 없어서 불이 꺼짐

  // 여기서 className은 Modal이 항상 activeObject를 표시하기 때문에 "inactive"(비활성)일 수 없습니다.
  //   const Modal = ({ object: { id, productID, name, produce, registration, detail, manager, onRemove }, onAccept }) => {
  //                   // 모달창에 들어갈 리스트 내용 요소                                              // 수정버튼 클릭 이벤트
  //                       // 이런 형식은 처음 보는데..?**

  //     const [ editing, setEditing ] = useState({     // 기존값 들고 와서 수정 시 값이 바뀌는걸 반영해줌
  //       id: id,       // 기준값
  //       productID: productID,
  //       name: name,
  //       produce: produce,
  //       registration: registration,
  //       detail: detail,
  //       manager: manager
  //     })

  //     const _handleChange = (e) => {
  //       const {name, value} = e.target
  //       setEditing(pre => {
  //         return {
  //           ...pre,
  //           [ name ]: value
  //         }
  //       })
  //     }

  //   return (
  //     <div>UserList</div>
  //   )
  // }

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
    <>
      <ScrollView>
        {users.map(
          ({ id, productID, name, produce, registration, detail, manager }) => (
            // map으로 돌려 표시할 리스트 내용에 관한 정보와 모달창표시에 필요한 users에 관한 속성값 부모컴포넌트로부터 상속 받기

            <OuterContainer
              key={id}
              onPress={() => {
                console.log(`ID:${id} 모달 열림`);
                setActiveObject({
                  id,
                  productID,
                  name,
                  produce,
                  registration,
                  detail,
                  manager,
                  onRemove,
                  onUpdate, // onChange,
                });
                // 모달창에 들어갈 리스트에 포함된 내용&이벤트 요소 : 원래값 null 이다가 오픈할때 내용 속성값들 받아옴
                setShowModal(true);
              }}
            >
              <Container>
                <TitleText>제품 ID : </TitleText>
                <ValueText>{productID}</ValueText>
              </Container>

              <Container>
                <TitleText>제품명 : </TitleText>
                <ValueText>{name}</ValueText>
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
      </ScrollView>


                              {/* // 수정버튼 클릭 이벤트 */}
      {showModal ? <Modal object={activeObject} onAccept={handleToggleEdit} /> : null} {/* 모달창 표시 부분 : 상태관리를 통해 노출 결정 */}
        {/* // 모달창에 들어갈 리스트 내용 요소 */}
    </>
  );
}
