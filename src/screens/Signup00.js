// 회원가입 화면

import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, Input, ErrorMessage } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signup } from "../firebase";
import { Alert, TextInput, View, Text } from "react-native";
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

const ErrorMG = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const ButtonBox = styled.View``;

export default function Signup({ navigation }) {
  const { setUser } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [introduce, setIntroduce] = useState("");

  //오류메시지 상태저장
  const [nameMessage, setNameMessage] = useState(null)
  const [emailMessage, setEmailMessage] = useState(null)
  const [passwordMessage, setPasswordMessage] = useState(null)
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState(null)

  // 유효성 검사
  const [isName, setIsName] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)

  // useRef
  const refName = useRef(null);
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refPasswordConfirm = useRef(null);
  const refIntroduce = useRef(null);  // 소개
  // const refDidMount = useRef(null); // 회원가입 에러 메세지가 처음부터 나오지 않게 하기 위한 코드

  useEffect(() => {  // 최초 화면 진입 시 name input에 자동 focus
    refName.current.focus();
  }, []);

  // useEffect(() => {
  //   refName.current.value === "" || null ? setNameMessage("이름을 입력해주세요") : null 
  // }, [refName]);

  useEffect(() => {
    // 버튼 활성화 컨트롤
    setDisabled(
      !(name && email && password && passwordConfirm )
      // !(name && email && password && passwordConfirm && !errorMessage)
    );
  }, [email, name, password, passwordConfirm ]);

  // useEffect(() => {
  //   if (refDidMount.current) {
  //     let error = 'none';
  //     if (!name) {
  //       error = "이름을 입력해주세요";
  //     } else if (!email) {
  //       error = "이메일을 입력해주세요";
  //     } else if (!validateEmail(email)) {
  //       error = "이메일을 형식에 맞게 입력해주세요";
  //     } else if (password.length < 6) {
  //       error = "비밀번호를 6자 이상 입력해주세요";
  //     } else if (password !== passwordConfirm) {
  //       error = "비밀번호를 다시 확인해주세요";
  //     } else {
  //       error = "";
  //     }
  //     setErrorMessage(error);
  //   } else {
  //     refDidMount.current = true;
  //   }
  // }, [email, name, password, passwordConfirm, errorMessage]);

  const _handleSignupBtnPress = async () => {
    // console.log("signup");

    // try...catch 문법: 실행할 코드블럭을 표시하고 예외(exception)가 발생(throw)할 경우의 응답을 지정
    try {
      spinner.start();
      const user = await signup({ name, email, password, introduce });
      setUser(user);
    } catch (e) {
      Alert.alert('Signup Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  const NameMessageCh() => {
    if(refName.current === null) {
      setnameMessage(<Text>{"이름을 입력해주세요"}</Text>)
    } else {
      setnameMessage(null)
    }
  }

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Input
          ref={refName}
          label="이름"
          placeholder="Name"
          returnkeyType="next"
          value={name}
          onChangeText={setName}
          onSubmitEditing={() => refEmail.current.focus()}
          onBlur={(value) => {
            setName(name.trim()), // trim() 메서드는 문자열 양 끝의 공백을 제거
            // {refName.current.value === "" ? setNameMessage(<ErrorMG>{"이름을 입력해주세요"}</ErrorMG>) : null}
            // {refName.current.value === null ? null : setNameMessage("이름을 입력해주세요")}
            NameMessageCh()
          }} 
          maxLength={12}
        />
        {/* <View>{refName.current === null ? <Text>{"이름을 입력해주세요"}</Text> : null}</View> */}
        <ErrorMG>{nameMessage}</ErrorMG>
        {/* {nameMessage} */}
        <Input
          ref={refEmail}
          label="아이디"
          placeholder="Email"
          returnkeyType="next"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => refPassword.current.focus()}
          onBlur={() => setEmail(removeWhitespace(email))} // 한글과 공백제거
        />
        <Input
          ref={refPassword}
          label="비밀번호"
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
          label="비밀번호 확인"
          placeholder="Password 확인"
          returnkeyType="next"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          isPassword={true} // 비밀번호 입력 시 특수문자로 노출
          onSubmitEditing={() => refIntroduce.current.focus()}
          onBlur={() => setPasswordConfirm(removeWhitespace(passwordConfirm))}
        />
        {/* <ErrorMessage message={errorMessage} /> */}
        <Input
          ref={refIntroduce}
          label="소개"
          placeholder="(선택) 간단 자기소개"
          // returnkeyType="done"
          returnkeyType= "go" 
          value={introduce}
          onChangeText={setIntroduce}
          isPassword={false} // 비밀번호 입력 시 특수문자로 노출
          onSubmitEditing={_handleSignupBtnPress}
          onBlur={() => setIntroduce(removeWhitespace(passwordConfirm))}
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
