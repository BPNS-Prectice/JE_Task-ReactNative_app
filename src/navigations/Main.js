import React, { useContext, useRef, useState } from "react";
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



const [inputs, setInputs] = useState({
  productID: '',
  productName: '',
  produce: '',
  registration: '',
  detail: '',
  manager: '',
});

const { productID, productName, produce, registration, detail, manager } = inputs; // 비구조화 할당을 통해 값 추출

const onChange = (keyvalue, e) => {
  const {text} = e.nativeEvent
  console.log(productID)
  // const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
  setInputs({
    ...inputs, // 기존의 input 객체를 복사한 뒤
    // [name]: value, // name 키를 가진 값을 value 로 설정
    [keyvalue]: text
  });
};


const [ users, setUsers ] = useState([                 
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
 
const nextId = useRef(5);
const onCreate = () => {
  const user = {
    id: nextId.current,
    productID,
    productName,
    produce,
    registration,
    detail,
    manager,
  };
  // setUsers([...users, user]) // 1. 스프레드 연산자(배열 복사)를 이용하여 배열 추가
  setUsers(users.concat(user)); // 2. concat을 이용하여 기존의 배열을 수정하지 않고, 새로운 원소가 추가된 새로운 배열을 만듦

  setInputs({ 
    productID: '', 
    productName: '', 
    produce: '', 
    registration: '', 
    detail: '', 
    manager: '', 
  })
  nextId.current += 1;
};

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
            headerRight: () => 
            <NewButton 
              title="New" 
              productID={productID}
              productName={productName}
              produce={produce}
              registration={registration}
              detail={detail}
              manager={manager}
              onChange={onChange}
              onCreate={onCreate} 
            />,
          }}
        />
      </Stack.Navigator>

      <MainWindow>
        <UserList users={users} />
      </MainWindow>
    </>
  );
};

export default Main;
