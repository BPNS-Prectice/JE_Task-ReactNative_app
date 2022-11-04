import React, { useContext } from "react";
import styled from "styled-components";
import { Button } from "../components";
import { UserContext } from "../contexts";
// import LogoutButton from "../components";
import { LogoutButton } from "../components";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Profile = ({ navigation, route }) => {
  console.log(route.params)
  const { setUser } = useContext(UserContext);

  return (
    <Container>
      {/* <Button title="signout" onPress={() => navigation.navigate("Signin")} />
      signout 버튼을 누르면 Signin화면으로 넘어가기 => 로그아웃 버튼으로 대체 */}

      {/* <LogoutButton title="Logout" onPress={() => setUser({})} /> */}
      <LogoutButton title="Logout" onPress={() => setUser({})} />
                                          {/* User.js에서 등록된 setUser = ({ uid })를 비우고 로그아웃 모드 */}
    </Container>
  );
};

export default Profile;
