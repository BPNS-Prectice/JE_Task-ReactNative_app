// import React, { useState } from "react";
// import {
//   TouchableOpacity,
//   Alert,
//   Modal,
//   StyleSheet,
//   Text,
//   Pressable,
//   View,
//   TouchableWithoutFeedback,
// } from "react-native";
// import styled from "styled-components";
// import PropTypes from "prop-types";
// import Button from "./Button";
// import LogoutButton from "./LogoutButton";

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

// const Title = styled.Text`
//   font-size: 15px;
//   color: ${({ theme }) => theme.btnTitle};
// `;

// const ButtonBox = styled.View`
//   flex-direction: row;
// `;

// const ModalButton = styled.TouchableOpacity`
//   background-color: ${({ theme }) => theme.btnBackground};
//   flex: 1;
//   padding: 10px 5px;
//   margin: 7px;
//   border-radius: 5px;
// `;

// const ModalTitle = styled.Text`
//   font-size: 23px;
//   padding: 10px;
// `;

// const backgroundFilter = styled.View`
//   background-color: gray;
//   position: absolute;
//   flex: 1;
// `;

// const CenteredView = styled.View`
//   flex: 1;
//   justify-content: "center";
//   align-items: "center";
//   margin-top: 22;
// `;

// const NewButton = ({ title, containerStyle, textStyle }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   return (
//     <>
//       <TouchableOpacity
//         onPress={() => setModalVisible(true)}
//         style={{ flexDirection: "row", width: "70%", height: 60 }}
//       >
//         <Container>
//           <Title>{title}</Title>
//         </Container>
//       </TouchableOpacity>

//       <Modal
//         animationType="slide" // 아래에서 위로 나타나는 효과
//         transparent={true} // 모달창 전체화면 채움 여부(투명창)
//         visible={modalVisible} // 모달창 표시 여부
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//           setModalVisible(!modalVisible);
//         }}
//         style={{ backgroundColor: "#00000099" }} //
//       >
//         <CenteredView>
//           <View style={styles.modalView}>
//             <ModalTitle>제품 정보</ModalTitle>
//             <ButtonBox>
//               <ModalButton onPress={() => setModalVisible(!modalVisible)}>
//                 <Text style={styles.textStyle}>취소</Text>
//               </ModalButton>
//               <ModalButton onPress={() => setModalVisible(!modalVisible)}>
//                 <Text style={styles.textStyle}>등록</Text>
//               </ModalButton>
//             </ButtonBox>
//           </View>
//         </CenteredView>
//       </Modal>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   CenteredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: "#F194FF",
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//   },
// });

// NewButton.propTypes = {
//   title: PropTypes.string.isRequired,
//   // onPress: PropTypes.func.isRequired,
//   textStyle: PropTypes.object,
// };

// export default NewButton;
