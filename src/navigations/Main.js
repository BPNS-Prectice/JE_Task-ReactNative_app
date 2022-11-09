import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../screens";
import styled, { ThemeContext } from "styled-components";
import { LogoutButton, NewButton, UserList } from "../components";

import { UserContext } from "../contexts";
import { View, StyleSheet, Button, Alert, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Stack = createStackNavigator();




const Main = () => {
  const theme = useContext(ThemeContext);
  const { setUser } = useContext(UserContext);

  const logoutButtonAlert = () =>
    Alert.alert("로그아웃 하시겠습니까?", "", [
      { text: "Cancel" },
      { text: "OK", onPress: () => setUser({}) },
    ]);

  const MainWindow = styled.ScrollView`
    /* flex: 1; */
    /* height: 100%; */
    border: 1px;
    flex: 10;  // 이렇게 해도 맞는걸까..?
  `;


const [ List, setList ] = useState([                 
  {
    id: 1,
    productID: 'BPSOLUTION01',
    productName: '제품명01',
    produce: '2022-09-01',
    registration: '2022-09-01',
    detail: "상세설명01 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quod!",
    manager: '홍길동'
  },
  {
    id: 2,
    productID: 'BPSOLUTION02',
    productName: '제품명02',
    produce: '2022-09-02',
    registration: '2022-09-02',
    detail: '상세설명02 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed minima quisquam quia.',
    manager: '아인슈타인'
  },
  {
    id: 3,
    productID: 'BPSOLUTION03',
    productName: '제품명03',
    produce: '2022-09-03',
    registration: '2022-09-03',
    detail: '상세설명03 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, quis corrupti.',
    manager: '엘렌워커'
  },
  {
    id: 4,
    productID: 'BPSOLUTION04',
    productName: '제품명04',
    produce: '2022-09-04',
    registration: '2022-09-04',
    detail: '상세설명04 Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi.',
    manager: '윤동주'
  },
])
 

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: theme.text,
          headerBackTitleVisible: false, // 뒤로 버튼 제목을 표시할지 여부(iOS에서만 지원)
          cardStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen
          name="제품 리스트"
          component={Profile}
          options={{
            // setUser({})}       // User.js에서 등록된 setUser = ({ uid })를 비우고 로그아웃 모드
            headerLeft: () => (
              <LogoutButton
                title="Logout"
                onPress={() => logoutButtonAlert()}
              />
            ),
            headerRight: () => <NewButton title="New" />,
          }}
        />
      </Stack.Navigator>

      <MainWindow>
        <UserList 
          productID = 'fdsf'
          productName = 'fdsf'
          produce = 'fdsf'
          registration = 'fdsf'
        />
        <UserList 
          List={List}
        />
      </MainWindow>
    </>
  );
};

export default Main;
