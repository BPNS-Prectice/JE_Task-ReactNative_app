import React from "react";
import styled from "styled-components";
import { Button } from "../components";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;
 

const Profile = ({ navigation, route }) => {
  console.log(route.params)
  return (
    <Container>
      <Button title="signout" onPress={() => navigation.navigate('Signin')} />
      {/* signout 버튼을 누르면 Signin화면으로 넘어가기 */}
    </Container>
  );
}

export default Profile;
