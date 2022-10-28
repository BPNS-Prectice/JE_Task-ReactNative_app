// Auth : 인증
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Signin, Signup, Profile } from "../screens";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();
// Stack Navigator: 각각의 새 화면이 스택 맨 위에 배치되는 화면 간에 앱을 전환할 수 있는 방법을 제공 기본 애니메이션으로 동작함

const Auth = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ headerShown: false }} // Signin화면에서 헤더를 보이지 않게 한다
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          title: '회원가입',
          headerTitleAlign: "center", // 헤더 제목 정렬
          headerBackTitleVisible: false,  // 뒤로 버튼 제목을 표시할지 여부(iOS에서만 지원)
          headerTinColor: theme.text,     // 헤더 텍스트 색상
          headerLeft: ({ onPress, tintColor }) => (  // headerLeft: 헤더의 왼쪽에 표시할 React Element를 반환하는 함수
            <MaterialIcons
              name="keyboard-arrow-left"
              size={38}
              color={tintColor}
              onPress={onPress}
            /> // 헤더안의 뒤로가기 아이콘 정의
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Auth;
