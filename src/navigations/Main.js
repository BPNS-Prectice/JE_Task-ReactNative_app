import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../screens";
import { ThemeContext } from "styled-components";
import { LogoutButton } from "../components";

const Stack = createStackNavigator();

const Main = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: theme.text,
        headerBackTitleVisible: false,  // 뒤로 버튼 제목을 표시할지 여부(iOS에서만 지원)
        cardStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen name="Profile" component={Profile}>
      {/* <LogoutButton title="Logout" onPress={() => setUser({})} />
                                          User.js에서 등록된 setUser = ({ uid })를 비우고 로그아웃 모드 */}
      </Stack.Screen>
      
    </Stack.Navigator>
  );
};

export default Main;
