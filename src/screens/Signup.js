// 회원가입 화면

import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, Input, ErrorMessage } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signup } from "../firebase";
import { Alert } from "react-native";
import { async } from "@firebase/util";
import { validateEmail, removeWhitespace } from "../utils";
import { UserContext, ProgressContext } from "../contexts";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 50px 20px;
`;

export default function Signup({ navigation }) {
  const {setUser} = useContext(UserContext)
  const {spinner} = useContext(ProgressContext)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refPasswordConfirm = useRef(null);
  const refDidMount = useRef(null); // 회원가입 에러 메세지가 처음부터 나오지 않게 하기 위한 코드

  useEffect(() => {
    // 버튼 활성화 컨트롤
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage)
    );
  }, [email, name, password, passwordConfirm, errorMessage]);

  useEffect(() => {
    if (refDidMount.current) {
      let error = "";
      if (!name) {
        error = "이름을 입력해주세요";
      } else if (!email) {
        error = "이메일을 입력해주세요";
      } else if (!validateEmail(email)) {
        error = "이메일을 형식에 맞게 입력해주세요";
      } else if (password.length < 6) {
        error = "비밀번호를 6자 이상 입력해주세요";
      } else if (password !== passwordConfirm) {
        error = "비밀번호를 다시 확인해주세요";
      } else {
        error = "";
      }
      setErrorMessage(error);
    } else {
      refDidMount.current = true
    }
  }, [email, name, password, passwordConfirm, errorMessage]);

  const _handleSignupBtnPress = async () => {
    // console.log("signup");
    try {
      spinner.start();
      const user = await signup({ name, email, password });
      setUser(user);
    } catch (e) {
      Alert.alert("Signup Error", e.message);
    } finally {
      spinner.stop();
    }
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
          onBlur={() => setName(name.trim())} // trim() 메서드는 문자열 양 끝의 공백을 제거
          maxLength={12}
        />
        <Input
          ref={refEmail}
          label="Email"
          placeholder="Email"
          returnkeyType="next"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => refPassword.current.focus()}
          onBlur={() => setEmail(removeWhitespace(email))} // 공백제거
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
          onBlur={() => setPassword(removeWhitespace(password))}
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
          onBlur={() => setPasswordConfirm(removeWhitespace(passwordConfirm))}
        />
        <ErrorMessage message={errorMessage} />
        <Button
          title="Sign in"
          onPress={_handleSignupBtnPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
}
