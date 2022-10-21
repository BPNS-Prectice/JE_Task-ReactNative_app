import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Signin, Signup } from "../screens";
import React from "react";

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ headerShown: false }}   // Signin화면에서 헤더를 보이지 않게 한다
      />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default Auth;
