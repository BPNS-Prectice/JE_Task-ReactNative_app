import React from "react";
import styled from "styled-components";
import { Button } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
`;

const StyledText = styled.Text`
  font-size: 30px;
  color: #111111;
`;

export default function Signup({ navegation }) {
  return (
    <Container>
      <StyledText>Signup</StyledText>
      {/* <Button title="signup" onPress={() => navegation.navigate('Signup')} /> */}
    </Container>
  );
}