import React, { useRef, useState } from "react";
import {
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
} from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "./Button";
import LogoutButton from "./LogoutButton";
import ModalButton from "./ModalButton";
// import { TextInput } from "react-native-gesture-handler";
import TextInputBox from "./TextInputBox";
import TextDivBox from "./TextDivBox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import UserList from "./UserList";

// const Container = styled.View`
//   background-color: ${({ theme }) => theme.btnBackground};
//   padding: 10px;
//   margin: 10px;
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   border-radius: 4px;
//   opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
// `;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Title = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.btnTitle};
`;

const ButtonBox = styled.View`
  flex-direction: row;
  margin-top: 30px;
`;

const ModalTitle = styled.Text`
  font-size: 23px;
  padding: 10px;
`;

// const backgroundFilter = styled.View`
//   background-color: gray;
//   position: absolute;
//   flex: 1;
// `;

const TextInputBoxOuter = styled.View`
  flex: 1;
  padding: 15px;
`;

const Explanation = styled.TextInput`
  border: 1px;
  border-color: ${({ theme }) => theme.btnBackground};
  height: 150px;
  font-size: 18px;
  padding: 10px;
`;

const Explanation_T = styled.TextInput`
  height: 150px;
  font-size: 18px;
  padding: 10px 0;
`;

const ListModal = ({
  object: {
    id,
    productID,
    productName,
    produce,
    registration,
    detail,
    manager,
    onRemove,
  },
  onModalClose,
  onUpdate,
  onChangeText,
  // _handleChange,
  onAccept,
}) => {
  const [modalVisible, setModalVisible] = useState(true); // 모달창 열림 여부
  const [editingMode, setEditingMode] = useState(false); // 수정모드에 진입했는지 여부 (수정버튼 클릭 시)

  // const [ editingInputs, setEditingInputs ] = useState(users, {       // 수정값 반영 요소들 // 수정 상태 입력 폼
  //   productID: '',
  //   productName: '',
  //   produce: '',
  //   registration: '',
  //   detail: '',
  //   manager: ''
  // })

  // const { productName, produce, registration, detail, manager } = editingInputs;      // 구조분해할당문법

  const ModalFilter = styled.View`
    position: absolute;
    width: ${windowWidth};
    height: ${windowHeight};
    background-color: gray;
    opacity: 0.5;
  `;

  const [editing, setEditing] = useState({
    // 기존값 들고 와서 수정 시 값이 바뀌는걸 반영해줌
    id: id, // 기준값
    productID: productID,
    productName: productName,
    produce: produce,
    registration: registration,
    detail: detail,
    manager: manager,
  });

  // const _handleChange = (e) => {
  //   const {name, value} = e.target
  //   setEditing(pre => {
  //     return {
  //       ...pre,
  //       [ name ]: value
  //     }
  //   })
  // }

  const _handleChange = (keyvalue, text) => {
    setEditing((pre) => {
      return {
        ...pre,
        [keyvalue]: text,
      };
    });
    // alert(inputs[keyvalue]);
    // console.log(keyvalue, inputs[keyvalue]);
  };

  // const refProductID = useRef(null);
  // const refProductName = useRef(null);
  // const refProduce = useRef(null);
  // const refRegistration = useRef(null);
  // const refDetail = useRef(null);

  return (
    <>
      {modalVisible ? <ModalFilter /> : null}
      <Modal
        animationType="slide" // 아래에서 위로 나타나는 효과
        transparent={true} // 모달창 전체화면 채움 여부(투명창)
        visible={modalVisible} // 모달창 표시 여부
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        //   setModalVisible(!modalVisible);
        // }}  // 모달창 닫힘
      >
        <KeyboardAwareScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ModalTitle>제품 정보</ModalTitle>
              {editingMode ? (
                <TextInputBoxOuter>
                  <TextDivBox
                    name={"productID"}
                    InputTitleText={"제품 ID"}
                    value={editing.productID}
                  />
                  <TextInputBox
                    name={"productName"}
                    InputTitleText={"제품명"}
                    placeholder={"제품명을 입력해주세요"}
                    onChangeText={(e) => _handleChange("productName", e)}
                    value={editing.productName}
                  />
                  <TextInputBox
                    name={"produce"}
                    InputTitleText={"제조일자"}
                    placeholder={"yyyy-mm-dd"}
                    onChangeText={(e) => _handleChange("produce", e)}
                    value={editing.produce}
                  />
                  <TextInputBox
                    name={"registration"}
                    InputTitleText={"등록일자"}
                    placeholder={"yyyy-mm-dd"}
                    onChangeText={(e) => _handleChange("registration", e)}
                    value={editing.registration}
                  />
                  <Text style={{ fontSize: 20, lineHeight: 50 }}>상세설명</Text>
                  <Explanation
                    name={"detail"}
                    value={editing.detail}
                    multiline={true}
                    textAlignVertical="top" // 첫줄부터 입력시작 (기본값은 center)
                    onChangeText={(e) => _handleChange("registration", e)}
                    styled={{ fontSize: "18px" }}
                  ></Explanation>

                  <ButtonBox>
                    <ModalButton
                      // onPress={() => setModalVisible(!modalVisible)}
                      // onPress={onModalClose}
                      onPress={() => setEditingMode(false)}
                      title="취소"
                    />
                    <ModalButton
                      // onPress={onUpdate()}
                      onPress={(e) => {onAccept(e, editing)}}
                      title="수정"
                    />
                  </ButtonBox>
                </TextInputBoxOuter>
              ) : (
                <TextInputBoxOuter>
                  <TextDivBox
                    name={"productID"}
                    InputTitleText={"제품 ID"}
                    value={editing.productID}
                  />
                  <TextDivBox
                    name={"productName"}
                    InputTitleText={"제품명"}
                    value={editing.productName}
                  />
                  <TextDivBox
                    name={"produce"}
                    InputTitleText={"제조일자"}
                    value={editing.produce}
                  />
                  <TextDivBox
                    name={"registration"}
                    InputTitleText={"등록일자"}
                    value={editing.registration}
                  />
                  <Text style={{ fontSize: 20, lineHeight: 50 }}>상세설명</Text>
                  <Explanation_T
                    name={"detail"}
                    // ref={refDetail}
                    value={detail}
                    multiline={true}
                    textAlignVertical="top" // 첫줄부터 입력시작 (기본값은 center)
                    styled={{ fontSize: "18px" }}
                  ></Explanation_T>

                  <ButtonBox>
                    <ModalButton
                      onPress={() => {
                        onCreate();
                      }}
                      title="삭제"
                    />
                    <ModalButton
                      onPress={() => {
                        setEditingMode(true);
                      }}
                      title="수정"
                    />
                    <ModalButton
                      onPress={onModalClose}
                      // onPress={() => setShowModal}
                      title="확인"
                    />
                  </ButtonBox>
                </TextInputBoxOuter>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 17,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

ListModal.propTypes = {
  onPress: PropTypes.func,
};

export default ListModal;
