import React, { useContext, useRef, useState } from "react";
import { ThemeContext } from "styled-components";
import styled from "styled-components";
import { Button, Input } from "../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


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
  // 정확힌 모르겠으나 헤더 대신 패딩을 넣는 ? 그런 용도인듯
  const theme = useContext(ThemeContext);

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const refPassword = useRef(null);

  const _handleSigninBtnPress = () => {
    console.log('signin')
  }

  return (
    // // <KeyboardAwareScrollView 
    // extraScrollHeight={20}
    // contentContainerStyle={{ flex: 1 }}
    // >
    <Container insets={insets}>
      <Input
        label="ID"
        placeholder="user ID"
        returnkeyType="next"
        value={userId}
        onChangeText={setUserId}
        onSubmitEditing={() => refPassword.current.focus()}
      />
      <Input
        ref={refPassword}
        label="Password"
        placeholder="user Password"
        returnkeyType="done"
        value={userPw}
        onChangeText={setUserPw}
        isPassword={true} // 비밀번호 입력 시 특수문자로 노출
        onSubmitEditing={_handleSigninBtnPress}
      />
      <Button title="Sign in" onPress={_handleSigninBtnPress} />
      <Button
        title="or sign up"
        onPress={() => navigation.navigate("Signup")}
        containerStyle={{ marginTop: 0, backgroundColor: "transparent" }}
        textStyle={{ color: theme.btnTextLink, fontSize: 18 }}
      />
    </Container>
    // </KeyboardAwareScrollView>
  );
}
