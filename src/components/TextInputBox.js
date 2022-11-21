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

const TextBox = styled.TextInput`
  border: 1px;
  width: ${({ width }) => windowWidth - 200}px;
  height: 50px;
  margin: 10px 0;
  border-color: ${({ theme }) => theme.btnBackground};
  font-size: 18px;
  padding-left: 15px;
`;

const TextInputBox = ({
  InputTitleText,
  returnKyeType,
  placeholder,
  onChangeText,
  value,
}) => {
  return (
    <Outer>
      <InputTitle>{InputTitleText}</InputTitle>
      <TextBox
        // ref={ref}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        returnKyeType={returnKyeType}
        autoCapitalize="none" // 자동 대문자 사용 안함
        autoCorrect={false} // 오타 자동 수정 모드 끄기
      />
    </Outer>
  );
};

export default TextInputBox;
