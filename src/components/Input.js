import React, { useState, forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`;
const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme, isFocused }) =>
    isFocused ? theme.text : theme.inputLabel};
`;
const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.inputPlaceholder,
}))`
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  padding: 20px 10px;
  font-size: 16px;
  border: 1px solid
    ${({ theme, isFocused }) => (isFocused ? theme.text : theme.inputBorder)};  // 회색이다가 포커스 시 검은색으로 변하기
  border-radius: 4px;
`;

const Input = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      onSubmitEditing,
      onBlur,
      placeholder,
      returnkeyType,
      maxLength, // 전달 받아야 하는 값들
      isPassword,
    },
    ref  // ref는 함수의 두번째 파라미터로 전달되는 것을 기억하기
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <Container>
        <Label isFocused={isFocused}>{label}</Label>
        <StyledInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          placeholder={placeholder}
          returnkeyType={returnkeyType}  // returnKeyType: 키보드 우측 하단에 있는 버튼을 어떤 타입으로 할 건지를 결정하는 prop
          maxLength={maxLength}
          autoCapitalize="none" // 자동 대문자 사용 안함
          autoCorrect={false} // 오타 자동 수정 모드 끄기
          textContentType="none" // 아이폰 키보드에 이메일 형식으로 나타나는 것 방지
          isFocused={isFocused}        // 포커스 상태인지 구분
          onFocus={() => setIsFocused(true)}
          secureTextEntry={isPassword}   // 비밀번호 모드 - 입력문자 표시X
        />
      </Container>
    );
  }
);

// Input.defaultProps = {
//   onBlur: () => {}, // {}안에 나중에 수정 된 값을 넣기 편하도록 틀만 먼저 입력한것 같다
// };  의미 없는 것 

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  returnkeyType: PropTypes.oneOf(["done", "next"]), // string이긴 하지만 oneOf를 이용해서 두가지 중 한가지만 고르도록 하겟다
  maxLength: PropTypes.number,
  isPassword:  PropTypes.bool,
};

export default Input;
