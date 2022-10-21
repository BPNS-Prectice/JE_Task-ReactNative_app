import React from "react";
import styled from "styled-components";
import PropTypos from "prop-types";

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`;
const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.inputLabel};
`;
const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.inputPlaceholder,
}))`
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  padding: 20px 10px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 4px;
`;

const Input = ({
  label,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur,
  placeholder,
  returnkeyType,
  maxLength, // 전달 받아야 하는 값들
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <StyledInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onBlur={onBlur}
        placeholder={placeholder}
        returnkeyType={returnkeyType}
        maxLength={maxLength}
        autoCapitalize="none"  // 자동 대문자 사용 안함
        autoCorrect={false} // 오타 자동 수정 모드 끄기
      />
    </Container>
  );
};

Input.PropTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  returnkeyType: PropTypes.oneOf(["done", "next"]), // string이긴 하지만 oneOf를 이용해서 두가지 중 한가지만 고르도록 하겟다
  maxLength: PropTypes.numder,
};



export default Input;