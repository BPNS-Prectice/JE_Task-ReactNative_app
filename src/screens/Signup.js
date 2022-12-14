// 회원가입 화면

import React, { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Button, Input, ErrorMessage } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signup } from "../firebase";
import { Alert, TextInput } from "react-native";
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

const ButtonBox = styled.View``;


export default function Signup({ navigation }) {
  const { setUser } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [introduce, setIntroduce] = useState("");


  const refName = useRef(null);
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refPasswordConfirm = useRef(null);
  const refIntroduce = useRef(null);
  const refDidMount = useRef(null); // 회원가입 에러 메세지가 처음부터 나오지 않게 하기 위한 코드

  const PwCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g;


  useEffect(() => {  // 최초 화면 진입 시 name input에 자동 focus
    refName.current.focus();
  }, []);

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
      } else if (!PwCheck.test(password)) {
        error = "비밀번호는 최소 8자리, 숫자,문자,특수문자 최소 1개 이상으로 설정해주세요";
      } else if (password !== passwordConfirm) {
        error = "비밀번호를 다시 확인해주세요";
      } else {
        error = "";
      }
      setErrorMessage(error);
    } else {
      refDidMount.current = true;
    }
  }, [name, email, password, passwordConfirm, errorMessage]);

  const _handleSignupBtnPress = async () => {
    // console.log("signup");

    // try...catch 문법: 실행할 코드블럭을 표시하고 예외(exception)가 발생(throw)할 경우의 응답을 지정
    try {
      console.log(email)
      spinner.start();
      // const user = await signup({ email, name, password, introduce });
      const user = await signup({ email, name, password, introduce });
      setUser(user);
    } catch (e) {
      Alert.alert('Signup Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Input
          ref={refName}
          label="이름"
          placeholder="Name"
          returnKeyType="next"
          value={name}
          onChangeText={setName}
          onSubmitEditing={() => refEmail.current.focus()}
          onBlur={() => setName(name.trim())} // trim() 메서드는 문자열 양 끝의 공백을 제거
          maxLength={20}
        />
        <Input
          ref={refEmail}
          label="아이디"
          placeholder="Email"
          returnkeyType="next"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => refPassword.current.focus()}
          onBlur={() => setEmail(removeWhitespace(email))} // 공백제거
        />
        <Input
          ref={refPassword}
          label="비밀번호"
          placeholder="최소 8자리, 숫자,문자,특수문자 최소 1개"
          returnkeyType="next"
          value={password}
          // onChangeText={(text) => {
          //   setPassword(text)
          //   console.log(text)
          // }}           // 이런식(하나에 두개 이상의 이벤트글 실행하는 구문 중 하나라도 인자가 필요한게 있는 함수)을 쓸땐 (인자)를 들고와야한다
          onChangeText={setPassword}
          isPassword={true} // 비밀번호 입력 시 특수문자로 노출
          onSubmitEditing={() => refPasswordConfirm.current.focus()}
          onBlur={() => setPassword(removeWhitespace(password))}
        />
        <Input
          ref={refPasswordConfirm}
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
          returnkeyType="next"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          isPassword={true} // 비밀번호 입력 시 특수문자로 노출
          onSubmitEditing={() => refIntroduce.current.focus()}
          onBlur={() => setPasswordConfirm(removeWhitespace(passwordConfirm))}
        />
        <ErrorMessage message={errorMessage} />
        <Input
          ref={refIntroduce}
          label="소개"
          placeholder="(선택) 간단 자기소개"
          returnkeyType="next"
          value={introduce}
          onChangeText={setIntroduce}
          isPassword={false} // 비밀번호 입력 시 특수문자로 노출
          onSubmitEditing={_handleSignupBtnPress}
          onBlur={() => setIntroduce()}
          style={{
            height: "150",
          }}
        />

        <ButtonBox
          style={{
            flexDirection: "row",
            width: "100%",
            flex: 1,
          }}
        >
          <Button title="뒤로가기" onPress={() => navigation.navigate("Signin")}/>
          <Button
            title="회원가입"
            onPress={_handleSignupBtnPress}
            disabled={disabled}
          />
        </ButtonBox>
      </Container>
    </KeyboardAwareScrollView>
  );
}
