// 로그인 화면

import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "styled-components";
import styled from "styled-components";
import { Button, Input, ErrorMessage, loginButton } from "../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signin } from "../firebase";
import { Alert, View, Text } from "react-native";
import { validateEmail, removeWhitespace } from "../utils";
import { UserContext, ProgressContext } from "../contexts";
import { Checkbox } from "react-native-paper";

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useAsyncStorage } from '@react-native-async-storage/async-storage';
// import AsyncStorage from 'react-native-async-storage/async-storage';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import AsyncStorage from '@react-native-community/async-storage';




const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

const LoginTitle = styled.Text`
  flex: 1;
  font-size: 33px;
  /* align-content: center; */
  margin-top: 150px;
  line-height: 50px;
`;

const ButtonBox = styled.View``;

export default function Signin({ navigation }) {
  const insets = useSafeAreaInsets();
  // 헤더의 존재 대신 패딩을 넣어 여백을 준다 - Expo참고

  const theme = useContext(ThemeContext);
  const { setUser } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const refPassword = useRef(null);
  // const refCheck = useRef(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // 버튼 활성화 조건
    setDisabled(!(name && email && password && !errorMessage));
  }, [name, email, password, errorMessage]);

  const _handleNameChange = (name) => {
    // setName(changedName);
    setErrorMessage(
      name === '' ?  "이름을 입력해주세요" : null
      // 이름을 입력하지 않은 경우 하단 에러메세지 노출
    );
  };

  const _handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email); // removeWhitespace: utils.js파일에서 정의한 한글&공백제거 함수
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? "" : "아이디를 형식에 맞게 정확히 입력해주세요"
      // 입력할때 이메일 형식이 아닌 경우 하단 에러메세지 노출
    );
  };

  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password)); // removeWhitespace: utils.js파일에서 정의한 공백제거 함수
  };

  const _handleSigninBtnPress = async () => {
    // 인풋 입력 후 로그인 실행
    // try...catch 문법: 실행할 코드블럭을 표시하고 예외(exception)가 발생(throw)할 경우의 응답을 지정
    try {
      // 실행할 선언들
      spinner.start();
      const user = await signin({ name, email, password });
      setUser(user);
      // navigation.navigate("Profile", { user }); // Profile파일로 user정보 넘겨주기
    } catch (e) {
      // try블록에서 예외가 발생했을때 실행될 선언들
      // Alert.alert("Login Error", e.message);
      Alert.alert("Login Error", "아이디와 비밀번호를 정확하게 입력해주세요");

    } finally {
      // ES6문법: finally() 는 Promise 가 resolve(해결)되던 reject(거부)되던 상관없이 지정된 함수를 실행- 로그인 성공여부와 상관없이 실행
      spinner.stop(); // 로그인 성공여부와 상관없이 스피너 실행 정지 시키기
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={20}
      contentContainerStyle={{ flex: 1 }} // 화면 세로 중앙정렬
    >
      <Container insets={insets}>
        <LoginTitle>제품 관리 시스템</LoginTitle>

        <Input
          label="ID"
          placeholder="ID"
          returnkeyType="next"
          value={email}
          onChangeText={_handleEmailChange} // 아이디가 입력 될때 에러메세지 노출 실행
          onSubmitEditing={() => refPassword.current.focus()}
          onBlur={() => setEmail(email.trim())} // trim() 메서드는 문자열 양 끝의 공백을 제거
        />
        <Input
          ref={refPassword}
          label="Password"
          placeholder="Password"
          returnkeyType="next"
          value={password}
          onChangeText={_handlePasswordChange}
          isPassword={true} // 비밀번호 입력 시 특수문자로 노출
          onSubmitEditing={_handleSigninBtnPress}
          onBlur={() => setPassword(password.trim())} // trim() 메서드는 문자열 양 끝의 공백을 제거
        />
        <ErrorMessage message={errorMessage} />
        <View style={{ flexDirection: "row", width: "100%", height: 50 }}>
          <Checkbox
            // ref={refCheck}
            status={checked ? "checked" : "unchecked"}
            color= "#3f8aec"
            onPress={() => {
              setChecked(!checked);
            }}
          ></Checkbox>
          <Text style={{ fontSize: 20, lineHeight: 30, marginLeft: 5 }}>
            자동 로그인
          </Text>
        </View>
        <ButtonBox
          style={{
            flexDirection: "row",
            width: "100%",
            flex: 1,
          }}
        >
          <Button
            title="회원가입"
            onPress={() => navigation.navigate("Signup")}
            // containerStyle={{ marginTop: 0, backgroundColor: "transparent" }}
            // textStyle={{ color: theme.btnTextLink, fontSize: 18 }}
          />
          <Button
            title="로그인"
            onPress={() => {
              _handleSigninBtnPress()

              //체크박스 상태 파악해서 로컬스토리지 정보 저장하기
              console.log(checked)

              const userID = email;         
              
              checked ? 
              AsyncStorage.setItem('UserID', userID)  // 로컬 스토리지에 유저 아이디 저장하기
                : console.log('no')
            }}
            disabled={disabled}
            style={{ flex: 1 }}
          />
          {/* disabled : 비활성화 */}
        </ButtonBox>
      </Container>
    </KeyboardAwareScrollView>
  );
}
