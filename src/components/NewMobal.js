import React, { useState } from "react";
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
`;

const NewButton = ({ title, containerStyle, textStyle }) => {
  const [modalVisible, setModalVisible] = useState(false);
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
                <TextInputBox InputTitleText={"제품 ID"} />
                <TextInputBox InputTitleText={"제품명"} />
                <TextInputBox InputTitleText={"제조일자"} />
                <TextInputBox InputTitleText={"등록일자"} />
                <Text style={{ fontSize: 20, lineHeight: 50 }}>상세설명</Text>
                <Explanation
                  multiline={true}
                  textAlignVertical="top" // 첫줄부터 입력시작 (기본값은 center)
                  styled={{ fontSize:'18px'}}
                ></Explanation>

                <ButtonBox>
                  <ModalButton
                    onPress={() => setModalVisible(!modalVisible)}
                    title="취소"
                  />
                  <ModalButton
                    onPress={() => setModalVisible(!modalVisible)}
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
