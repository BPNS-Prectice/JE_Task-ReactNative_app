import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.View`
  border: ${({ theme }) => theme.btnBackground};
  padding: 10px;
  margin: 10px;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
`;

const Title = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.btnBackground};
`;
                                               
                                                           
const LogoutButton = ({ title, onPress, containerStyle, textStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: "row", width: '70%', height: 60 }}
    >
      <Container style={containerStyle} >
        <Title style={textStyle}>{title}</Title>
      </Container>
    </TouchableOpacity>
  );
};



LogoutButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

export default LogoutButton;
