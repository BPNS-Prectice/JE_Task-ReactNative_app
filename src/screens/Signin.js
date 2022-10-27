// 로그인 화면

import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "styled-components";
import styled from "styled-components";
import { Button, Input, ErrorMessage } from "../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signin } from "../firebase";
import { Alert } from "react-native";
import { validateEmail, removeWhitespace } from "../utils";
import { UserContext, ProgressContext } from "../contexts";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

export default function Signin({ navigation }) {
  const insets = useSafeAreaInsets();
  // 헤더의 존재 대신 패딩을 넣어 여백을 준다 - Expo참고

  const theme = useContext(ThemeContext);
  const { setUser } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const refPassword = useRef(null);

  useEffect(() => {
    // 버튼 활성화 조건
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

  const _handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email);  // removeWhitespace: utils.js파일에서 정의한 공백제거 함수
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? "" : "Please verify your email"
      // 입력할때 이메일 형식이 아닌 경우 하단 에러메세지 노출
    );
  };

  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password));  // removeWhitespace: utils.js파일에서 정의한 공백제거 함수
  };

  const _handleSigninBtnPress = async () => {  // 인풋 입력 후 로그인 실행
    // try...catch 문법: 실행할 코드블럭을 표시하고 예외(exception)가 발생(throw)할 경우의 응답을 지정
    try {  // 실행할 선언들
      spinner.start()
      const user = await signin({ email, password });
      setUser(user);
      // navigation.navigate("Profile", { user }); // Profile파일로 user정보 넘겨주기
    } catch (e) {  // try블록에서 예외가 발생했을때 실행될 선언들
      Alert.alert("Signin Error", e.message);
    } finally {  // ES6문법: finally() 는 Promise 가 resolve(해결)되던 reject(거부)되던 상관없이 지정된 함수를 실행- 로그인 성공여부와 상관없이 실행
      spinner.stop();  // 로그인 성공여부와 상관없이 스피너 실행 정지 시키기
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={20}
      contentContainerStyle={{ flex: 1 }} // 화면 세로 중앙정렬
    >
      <Container insets={insets}>
        <Input
          label="ID"
          placeholder="user ID"
          returnkeyType="next"
          value={email}
          onChangeText={_handleEmailChange}  // 아이디가 입력 될때 에러메세지 노출 실행
          onSubmitEditing={() => refPassword.current.focus()}
        />
        <Input
          ref={refPassword}
          label="Password"
          placeholder="user Password"
          returnkeyType="done"
          value={password}
          onChangeText={_handlePasswordChange}
          isPassword={true} // 비밀번호 입력 시 특수문자로 노출
          onSubmitEditing={_handleSigninBtnPress}
        />
        <ErrorMessage message={errorMessage} />
        <Button
          title="Sign in"
          onPress={_handleSigninBtnPress}
          disabled={disabled}
        />
        {/* disabled : 비활성화 */}
        <Button
          title="or sign up"
          onPress={() => navigation.navigate("Signup")}
          containerStyle={{ marginTop: 0, backgroundColor: "transparent" }}
          textStyle={{ color: theme.btnTextLink, fontSize: 18 }}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
}
