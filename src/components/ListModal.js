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

const ListModal = ({ inputs,
  object: {
    id,
    productID,
    productName,
    produce,
    registration,
    detail,
    manager,
  },
  onModalClose,
  onUpdate,
  onChangeText,
  onRemove,
  // _handleChange,
  users,
  onAccept,
}) => {
  const [modalVisible, setModalVisible] = useState(true); // 모달창 열림 여부
  const [editingMode, setEditingMode] = useState(false); // 수정모드에 진입했는지 여부 (수정버튼 클릭 시)

  const ModalFilter = styled.View`
    position: absolute;
    /* flex-grow: 1; */
    width: ${windowWidth};
    height: ${windowHeight};
    /* height: ${windowHeight} - 15%; */
    /* height: ${(height) => windowHeight - 15}%; */
    /* height: 85%; */

    background-color: gray;
    opacity: 0.5;
  `;

  const onUpdateCK = (e) => {
    const Date =
      /^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/;
    const IdCk = /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{12,12}$/;

    // if (inputs.productName === "") {
    if (productName === "") {
      Alert.alert("제품명은 필수 입력입니다", "", [
        { text: "확인", onPress: () => setModalVisible(true) },
      ]);
    // } else if (!Date.test(inputs.produce) || inputs.produce !== "") {
    } else if (!Date.test(produce) && produce !== "") {
      Alert.alert("제조일자를 형식에 맞게 입력해주세요", "", [
        {
          text: "확인",
          onPress: () => {
            setModalVisible(true);
          },
        },
      ]);
    // } else if (!Date.test(inputs.registration) || inputs.registration !== "") {
    } else if (!Date.test(registration) && registration !== "") {
      Alert.alert("등록일자를 형식에 맞게 입력해주세요", "", [
        {
          text: "확인",
          onPress: () => {
            setModalVisible(true);
          },
        },
      ]);
    } else {
      // 등록 전 조건에 맞는 내용인지 확인
      // onUpdate(id, data)     // 조건에 맞는 내용이라면 등록하기
      onAccept(e, editing);
    }
  };

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

  return (
    <>
      {modalVisible ? <ModalFilter /> : null}
      <Modal
        animationType="slide" // 아래에서 위로 나타나는 효과
        transparent={true} // 모달창 전체화면 채움 여부(투명창)
        visible={modalVisible} // 모달창 표시 여부
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
                    onChangeText={(e) => _handleChange("detail", e)}
                    styled={{ fontSize: "18px" }}
                  ></Explanation>

                  <ButtonBox>
                    <ModalButton
                      // onPress={() => setModalVisible(!modalVisible)}
                      // onPress={onModalClose}
                      onPress={() => {
                        setEditingMode(false);
                        // return users(${id});
                        onModalClose();
                      }}
                      title="취소"
                    />
                    <ModalButton
                      // onPress={onUpdate()}
                      onPress={onUpdateCK}
                      // onPress={(e) => {onAccept(e, editing)}}
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
                    <ModalButton onPress={() => onRemove(id)} title="삭제" />
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
