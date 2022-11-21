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

const ModalFilter = styled.View`
  position: absolute;
  width: ${windowWidth};
  height: ${windowHeight};
  background-color: gray;
  opacity: 0.5;
`;

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

const backgroundFilter = styled.View`
  background-color: gray;
  position: absolute;
  flex: 1;
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

// const ListModal = ({ id, title, containerStyle, textStyle, productID, productName, produce, registration, detail, onCreate, onChange, onModalClose }) => {
const ListModal = ({ productID, productName, produce, registration, detail, onCreate, onChange }) => {
// const ListModal = ({ productID }) => {
  const [modalVisible, setModalVisible] = useState(true); // 모달창 열림 여부
  const [editingMode, setEditingMode] = useState(false)        // 수정모드에 진입했는지 여부 (수정버튼 클릭 시)
  // const [ editingInputs, setEditingInputs ] = useState(inputs, {       // 수정값 반영 요소들 // 수정 상태 입력 폼
  //   productID: '',                                   
  //   productName: '',
  //   produce: '',
  //   registration: '',
  //   detail: '',
  //   manager: ''
  // })

  // const { productID, productName, produce, registration, detail, manager } = editingInputs; 
 
  // const [ editing, setEditing ] = useState({     // 기존값 들고 와서 수정 시 값이 바뀌는걸 반영해줌 
  //   id: id,       // 기준값            
  //   productID: productID,
  //   productName: productName,
  //   produce: produce,
  //   registration: registration,
  //   detail: detail,
  //   manager: manager
  // })

   
  
  return (
    <>
      {/* <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{ flexDirection: "row", width: "70%", height: 60 }}
      >
        <Container>
          <Title>{title}</Title>
        </Container>
      </TouchableOpacity> */}
      {/* <Modal object={activeObject} /> */}

      <ModalFilter />
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
              {/* {editingMode ?  */}
              {/* <TextInputBoxOuter>
                <TextInputBox
                  name={"productID"}
                  InputTitleText={"제품 ID"}
                  // ref={refProductID}
                  placeholder={"제품고유 ID"}
                  onChangeText={(e) => onChange("productID", e)}
                  value={productID}
                  returnKyeType={"next"}
                />
                <TextInputBox
                  name={"productName"}
                  InputTitleText={"제품명"}
                  // ref={refProductName}
                  placeholder={"제품명을 입력해주세요"}
                  // onChangeText={onChangeText}
                  onChangeText={(e) => onChange("productName", e)}
                  value={productName}
                  returnKyeType={"next"}
                />
                <TextInputBox
                  name={"produce"}
                  InputTitleText={"제조일자"}
                  // ref={refProduce}
                  placeholder={"yyyy-mm-dd"}
                  // onChangeText={onChangeText}
                  onChangeText={(e) => onChange("produce", e)}
                  value={produce}
                  returnKyeType={"next"}
                />
                <TextInputBox
                  name={"registration"}
                  InputTitleText={"등록일자"}
                  // ref={refRegistration}
                  placeholder={"yyyy-mm-dd"}
                  // onChangeText={onChangeText}
                  onChangeText={(e) => onChange("registration", e)}
                  value={registration}
                  returnKyeType={"next"}
                />
                <Text style={{ fontSize: 20, lineHeight: 50 }}>상세설명</Text>
                <Explanation
                  name={"detail"}
                  // ref={refDetail}
                  value={detail}
                  multiline={true}
                  textAlignVertical="top" // 첫줄부터 입력시작 (기본값은 center)
                  styled={{ fontSize: "18px" }}
                ></Explanation>

                <ButtonBox> 
                  <ModalButton
                    onPress={() => {
                      onCreate()
                    }}
                    title="수정"
                  />
                  <ModalButton
                    // onPress={() => setModalVisible(!modalVisible)}
                    onPress={onModalClose}
                    title="취소"
                  />
                </ButtonBox>
              </TextInputBoxOuter>
              :  */}
              <TextInputBoxOuter key={id}>
                <TextDivBox 
                  name='productID' 
                  // onChange={_handleChange}
                  value={productID}
                /> 
                <TextDivBox 
                  name='productName' 
                  // onChange={_handleChange}
                  value={productName}
                /> 
                <TextDivBox 
                  name='produce' 
                  // onChange={_handleChange}
                  value={produce}
                /> 
                <TextDivBox 
                  name='registration' 
                  // onChange={_handleChange}
                  value={registration}
                />  
                <Text style={{ fontSize: 20, lineHeight: 50 }}>상세설명</Text>
                <Explanation
                  name={"detail"}
                  value={detail}
                ></Explanation>

                <ButtonBox>
                  <ModalButton
                    onPress={() => {
                      onCreate()
                    }}
                    title="삭제"
                  />
                  <ModalButton
                    onPress={() => {
                      setEditingMode(true)
                    }}
                    title="수정"
                  />
                  <ModalButton
                    onPress={setModalVisible(false)}
                    title="확인"
                  />
                </ButtonBox>
              </TextInputBoxOuter> } 
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
