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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import UserList from "./UserList";




const Container = styled.View`
  background-color: ${({ theme }) => theme.btnBackground};
  padding: 10px;
  margin: 10px;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
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

const NewButton = ({ title, containerStyle, textStyle }) => {
  const [modalVisible, setModalVisible] = useState(false); // 모달창 열림 여부

  // const refProductID = useRef(null);
  // const refProductName = useRef(null);
  // const refProduce = useRef(null);
  // const refRegistration = useRef(null);
  // const refDetail = useRef(null);

  // const [productID, setProductID] = useState('')
  // const [productName, setProductName] = useState('')
  // const [produce, setProduce] = useState('')
  // const [registration, setRegistration] = useState('')
  // const [detail, setdetail] = useState('')

  const [inputs, setInputs] = useState({
    productID,
    productName,
    produce,
    registration,
    detail,
    manager,
  });

  const { productID, productName, produce, registration, detail, manager } = inputs; // 비구조화 할당을 통해 값 추출

  const onChangeText = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };


  const nextId = useRef(7);

  const onCreate = () => {
    // 나중에 구현 할 배열에 항목 추가하는 로직

    const newList = {
      id: nextId.current,
      productID,
      productName,
      produce,
      registration,
      detail,
      manager,
    };
    // setList([...List, newList]);
    // updateList= setList([...List, newList]);
    
    setInputs({
      productID: '',
      productName: '',
      produce: '',
      registration: '',
      detail: '',
      manager: '',
    });

    nextId.current += 1;
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{ flexDirection: "row", width: "70%", height: 60 }}
      >
        <Container>
          <Title>{title}</Title>
        </Container>
      </TouchableOpacity>

      <Modal
        animationType="slide" // 아래에서 위로 나타나는 효과
        transparent={true} // 모달창 전체화면 채움 여부(투명창)
        visible={modalVisible} // 모달창 표시 여부
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <KeyboardAwareScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ModalTitle>제품 정보</ModalTitle>
              <TextInputBoxOuter>
                <TextInputBox
                  name={"productID"}
                  InputTitleText={"제품 ID"}
                  // ref={refProductID}
                  placeholder={"제품고유 ID"}
                  value={productID}
                  onChangeText={onChangeText}
                  returnKyeType={"next"}
                />
                <TextInputBox
                  name={"productName"}
                  InputTitleText={"제품명"}
                  // ref={refProductName}
                  placeholder={"제품명을 입력해주세요"}
                  value={productName}
                  onChangeText={onChangeText}
                  returnKyeType={"next"}
                />
                <TextInputBox
                  name={"produce"}
                  InputTitleText={"제조일자"}
                  // ref={refProduce}
                  placeholder={"yyyy-mm-dd"}
                  value={produce}
                  onChangeText={onChangeText}
                  returnKyeType={"next"}
                />
                <TextInputBox
                  name={"registration"}
                  InputTitleText={"등록일자"}
                  // ref={refRegistration}
                  placeholder={"yyyy-mm-dd"}
                  value={registration}
                  onChangeText={onChangeText}
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
                    onPress={() => setModalVisible(!modalVisible)}
                    title="취소"
                  />
                  <ModalButton
                    onPress={() => onCreate()}
                    title="등록"
                  />
                </ButtonBox>
              </TextInputBoxOuter>
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

NewButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export default NewButton;