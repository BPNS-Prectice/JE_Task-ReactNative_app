import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Signin, Signup, Profile } from "../screens";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

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
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerTinColor: theme.text,
          headerLeft: ({ onPress, tintColor }) => (
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
