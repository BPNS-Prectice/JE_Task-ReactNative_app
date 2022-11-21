import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TextInput } from "react-native-gesture-handler";
import { View, Dimensions } from "react-native";



const windowWidth = Dimensions.get("window").width;

const Outer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const InputTitle = styled.Text`
  width: 100px;
  /* margin-left: 20px; */
  font-size: 20px;
  line-height: 50px;
`;

const TextBox = styled.Text`
  /* border: 1px; */
  width: ${({ width }) => windowWidth - 200}px;
  height: 50px;
  margin: 10px 0;
  /* border-color: ${({ theme }) => theme.btnBackground}; */
  font-size: 18px;
  padding-left: 15px;
`;

const TextDivBox = ({
  InputTitleText,
  returnKyeType,
  placeholder,
  onChangeText,
  value,
  inputs,
  keyvalue,
}) => {
  return (
    <Outer>
      <InputTitle>{InputTitleText}</InputTitle>
      {/* <TextBox>{keyvalue, inputs[keyvalue]}</TextBox> */}
      <TextBox>{value}</TextBox>
    </Outer>
  );
};

export default TextDivBox;
