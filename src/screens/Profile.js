import React from "react";
import styled from "styled-components";
import { Button } from "../components";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export default function Profile({ navigation, route }) {
  console.log(route.params)
  return (
    <Container>
      <Button title="signout" onPress={() => navigation.navigate('Signin')} />
    </Container>
  );
}
