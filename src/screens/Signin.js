import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import styled from "styled-components";
import { Button } from "../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { theme } from "../../theme";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

const StyledText = styled.Text`
  font-size: 30px;
  color: #111111;
`;

export default function Signin({ navigation }) {
  const insets = useSafeAreaInsets();
  // 정확힌 모르겠으나 헤더 대신 패딩을 넣는 ? 그런 용도인듯
  const theme = useContext(ThemeContext);

  return (
    <Container insets={insets}>
      <StyledText>Signin</StyledText>
      <Button title="Sign up" onPress={() => console.log("signin")} />
      <Button
        title="or sign up"
        onPress={() => navigation.navigate("Signup")}
        containerStyle={{ marginTop: 0, backgroundColor: "transparent" }}
        textStyle={{ color: theme.btnTextLink, fontSize: 18 }}
      />
    </Container>
  );
}
