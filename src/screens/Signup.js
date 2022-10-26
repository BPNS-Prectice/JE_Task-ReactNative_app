// 회원가입 화면

import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Button, Input } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 50px 20px;
`;

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refPasswordConfirm = useRef(null);

  const _handleSignupBtnPress = () => {
    console.log("signup");
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Input
          label="Name"
          placeholder="Name"
          returnkeyType="next"
          value={name}
          onChangeText={setName}
          onSubmitEditing={() => refEmail.current.focus()}
        />
        <Input
          ref={refEmail}
          label="Email"
          placeholder="Email"
          returnkeyType="next"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => refPassword.current.focus()}
        />
        <Input
          ref={refPassword}
          label="Password"
          placeholder="Password"
          returnkeyType="next"
          value={password}
          onChangeText={setPassword}
          isPassword={true} // 비밀번호 입력 시 특수문자로 노출
          onSubmitEditing={() => refPasswordConfirm.current.focus()}
        />
        <Input
          ref={refPasswordConfirm}
          label="Password 확인"
          placeholder="Password 확인"
          returnkeyType="done"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          isPassword={true} // 비밀번호 입력 시 특수문자로 노출
          onSubmitEditing={_handleSignupBtnPress}
        />
        <Button title="Sign in" onPress={_handleSignupBtnPress} />
      </Container>
    </KeyboardAwareScrollView>
  );
}
