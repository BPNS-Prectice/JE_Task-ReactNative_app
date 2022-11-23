import React, { useContext, useRef, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../screens";
import styled, { ThemeContext } from "styled-components";
import { LogoutButton, NewButton, UserList } from "../components";

import { UserContext } from "../contexts";
import { View, StyleSheet, Button, Alert, Text, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Stack = createStackNavigator();


const Main = () => {

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

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
    border-top: 1px solid #333;
    /* flex: 10;  // 이렇게 해도 맞는걸까..? */
    /* margin-top: 100px; */
    /* height: ${(height) => windowHeight - 20}px; */
    height: 85%;
    /* align-items: flex-end; */
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
 
  const onChange = (keyvalue, text) => {
    setInputs({
      ...inputs,
      [keyvalue]: text
    })
    // alert(inputs[keyvalue]);
    console.log(keyvalue, inputs[keyvalue])
  }
    

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
    {
      id: 5,
      productID: 'BPSOLUTION04',
      productName: '제품명04',
      produce: '2022-09-04',
      registration: '2022-09-04',
      detail: '상세설명04 Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi.',
      manager: '윤동주'
    },
  ])
  
  const nextId = useRef(6);
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


  const onUpdate = ( id, data ) => {  // 기준값 id, 어떻게 바꿀지 = data
    setUsers(users.map(     // 1. 맵으로 전체를 돌리며 체크한다
      users => {          // 2. users 값을 파라미터로 가져와서
        if (users.id === id ) {   // 3. 만약 users가 가지고 있는 id값이 파라미터가 가지고 있는 id값이랑 일치한다
          return {
            id,              // id 는 id 그대로 쓰고(기준값)
            ...data,         // 여기에  productID, name, produce, ...등 각 요소의 값을 넣어준다
          }
        }
        return users;  // 조건이 트루가 아니라면(배열이 변한게 없다면) 그대로 리턴한다
      }
    ))
  }

  // const _handleChange = (e) => {
  //   const {name, value} = e.target
  //   setEditing(pre => {
  //     return {
  //       ...pre,
  //       [ name ]: value
  //     }
  //   })
  // } 

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
                productID={inputs.productID}
                productName={productName}
                produce={produce}
                registration={registration}
                detail={detail}
                manager={manager}
                onChange={onChange}
                onCreate={onCreate} 
              />
          }}
        />
      </Stack.Navigator>

      <MainWindow>
        <UserList 
          users={users} 
          onUpdate={onUpdate}
          // onChangeText={onChangeText}
          // _handleChange={onChange}
          // onChange={_handleChange}
        />
      </MainWindow>
    </>
  );
};

export default Main;