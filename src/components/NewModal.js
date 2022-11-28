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
import UserList from "./UserList";

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

const NewButton = ({ users, inputs, keyvalue, title, containerStyle, textStyle, productID, productName, produce, registration, detail, onChange, onCreate, onReset }) => {
  const [modalVisible, setModalVisible] = useState(false); // 모달창 열림 여부

  // const refProductID = useRef();
  // const refProductName = useRef(null);
  // const refProduce = useRef(null);
  // const refRegistration = useRef(null);
  // const refDetail = useRef(null);

  const onCreateCK = () => {
    const Date = /^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/
    const IdCk =/^(?=.*[A-Z])(?=.*\d)[A-Z\d]{12,12}$/;

    const duplicateCK = users.some( ({productID}) => {
      return productID === inputs.productID
    })

    if((inputs.productID) === '' || (inputs.productName) === '' ) {
      Alert.alert("제품ID와 제품명은 필수 입력입니다", "", [
        { text: "확인", onPress: () => setModalVisible(true) },
      ]);
    } else if( !IdCk.test(inputs.productID)){
      Alert.alert("제품ID를 올바르게 입력해주세요", "(숫자, 영어 대문자 조합 12자리)", [
        { text: "확인", onPress: () => {
          setModalVisible(true) 
          // refProductID.current.focus()
        }},
      ]);
    } else if (duplicateCK === true) {
      console.log(duplicateCK)
      Alert.alert("이미 존재하는 제품ID입니다", "", [
        { text: "확인", onPress: () => {
          setModalVisible(true) 
        }},
      ]);
    } else if( !Date.test(inputs.produce) && (inputs.produce !== '') ) {
      Alert.alert("제조일자를 형식에 맞게 입력해주세요", "", [
        { text: "확인", onPress: () => {
          setModalVisible(true) 
        }},
      ]);
    } else if( !Date.test(inputs.registration) && (inputs.registration !== '') ) {
      Alert.alert("등록일자를 형식에 맞게 입력해주세요", "", [
        { text: "확인", onPress: () => {
          setModalVisible(true) 
        }},
      ]);
    } else{      // 등록 전 조건에 맞는 내용인지 확인
      onCreate()     // 조건에 맞는 내용이라면 등록하기
    }
  } 


  
  
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
      >
        <KeyboardAwareScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ModalTitle>제품 신규 등록</ModalTitle>
              <TextInputBoxOuter>
                <TextInputBox
                  name={"productID"}
                  InputTitleText={"제품 ID"}
                  placeholder={"(필수)제품고유 ID"}
                  onChangeText={(text) => onChange("productID", text)}
                  value={productID}

                  // ref={refProductID}
                  returnKyeType="next"  // **수정필요
                  blurOnSubmit={false}
                  // onSubmitEditing={() => refProductName.current.focus()}
                />
                <TextInputBox
                  name={"productName"}
                  InputTitleText={"제품명"}
                  placeholder={"(필수)제품명"}
                  onChangeText={(text) => onChange("productName", text)}
                  onChange={onChange}
                  value={productName}

                  // ref={refProductName}
                  returnKeyType="next"
                  // blurOnSubmit={false}
                  onSubmitEditing={() => refProduce.current.focus()}
                />
                <TextInputBox
                  name={"produce"}
                  InputTitleText={"제조일자"}
                  placeholder={"yyyy-mm-dd"}
                  onChangeText={(text) => onChange("produce", text)}
                  value={produce}

                  // ref={refProduce}
                  returnKyeType="next"
                />
                <TextInputBox
                  name={"registration"}
                  InputTitleText={"등록일자"}
                  placeholder={"yyyy-mm-dd"}
                  onChangeText={(text) => onChange("registration", text)}
                  value={registration}

                  // ref={refRegistration}
                  returnKyeType="next"
                />
                <Text style={{ fontSize: 20, lineHeight: 50 }}>상세설명</Text>
                <Explanation
                  name={"detail"}
                  // ref={refDetail}
                  placeholder={"(선택)"}
                  value={detail}
                  onChangeText={(text) => onChange("detail", text)}
                  multiline={true}
                  textAlignVertical="top" // 첫줄부터 입력시작 (기본값은 center)
                  styled={{ fontSize: "18px" }}
                ></Explanation>

                <ButtonBox>
                  <ModalButton
                    onPress={() => {
                      onReset()
                      setModalVisible(!modalVisible)
                    }}
                    title="취소"
                  />
                  <ModalButton
                    onPress={() => {
                      // onCreate()
                      onCreateCK()
                      setModalVisible(!modalVisible)
                    }}
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