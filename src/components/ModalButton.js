import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.btnBackground};
  flex: 1;
  padding: 10px 5px;
  margin: 7px;
  border-radius: 5px;
`;

const Title = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.btnTitle};
  text-align: center;
`;

// disabled : 장애가 있는 : 비활성화
const ModalButton = ({ title, onPress }) => {
  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
};

ModalButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export default ModalButton;
