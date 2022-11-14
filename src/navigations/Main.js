import React, { useContext, useState, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../screens";
import { ThemeContext } from "styled-components";
import { LogoutButton } from "../components";
import UserList from "../components/UserList";

import { UserContext } from "../contexts";
import { View, StyleSheet, Button, Alert, ScrollView, Text } from "react-native";

const Stack = createStackNavigator();

const Main = () => {
  const theme = useContext(ThemeContext);
  const { setUser } = useContext(UserContext);

  const logoutButtonAlert = () =>
    Alert.alert("로그아웃 하시겠습니까?", "", [
      { text: "Cancel" },
      { text: "OK", onPress: () => setUser({}) },
    ]);

  /////////////////////////////////

  const [newModal, setNewModal] = useState(false); // 신규 모달창 열고 닫기
  const [inputs, setInputs] = useState({
    // 신규 모달창에 입력한 값 받아올 틀
    productID: "",
    name: "",
    produce: "",
    registration: "",
    detail: "",
    manager: "",
  });
  const { productID, name, produce, registration, detail, manager } = inputs;

  const onChange = (e) => {
    // 신규 모달창에 입력 이벤트가 있을때 폼안의 정보를 갱신하는 기능
    const { name, value } = e.target; // 이벤트가 일어나는 폼을 타겟으로 잡아
    setInputs({
      ...inputs, // 기존 inputs값 가져오기
      [name]: value, // name을 기준으로 잡고 그에 매칭되는 value값을 받아온다
    });
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      productID: "BPSOLUTION01",
      name: "제품명01",
      produce: "2022-09-01",
      registration: "2022-09-01",
      detail:
        "상세설명01 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, quod!",
      manager: "홍길동",
    },
    {
      id: 2,
      productID: "BPSOLUTION02",
      name: "제품명02",
      produce: "2022-09-02",
      registration: "2022-09-02",
      detail:
        "상세설명02 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed minima quisquam quia.",
      manager: "아인슈타인",
    },
    {
      id: 3,
      productID: "BPSOLUTION03",
      name: "제품명03",
      produce: "2022-09-03",
      registration: "2022-09-03",
      detail:
        "상세설명03 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, quis corrupti.",
      manager: "엘렌워커",
    },
    {
      id: 4,
      productID: "BPSOLUTION04",
      name: "제품명04",
      produce: "2022-09-04",
      registration: "2022-09-04",
      detail:
        "상세설명04 Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi.",
      manager: "윤동주",
    },
  ]);

  const nextId = useRef(5); // 새로 생성될 항목에 부여될 id값 : 폼에서 입력하는 항목이 아니기 때문에 따로 만들어줘야 함

  const onClose = () => {
    setNewModal(false);
  }; // 신규 모달창 취소 버튼 클릭시 모달창 닫힘 기능

  ////////////////////////

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
            headerRight: () => (
              <LogoutButton
                title="New"
                // onCreate={onCreate}   //onCreate왜 안먹히는지 해결할것
                onPress={() => {
                  setNewModal(true);
                }}
              />
            ),
          }}
        />
      </Stack.Navigator>

      <ScrollView>
        {newModal === true ? (
          <CreateUser
            onClose={onClose}
            onCreate={onCreate}
            onChange={onChange}
            //-- 자식 컴포넌트에게 속성 전달(상속)
          />
        ) : null}

        <UserList
          users={users}
          // onRemove={onRemove}
          // onUpdate={onUpdate}
          // 전달 props명(자식컴포넌트에서 받아서 이용함) = {현재(부모)컴포넌트의 오브젝트 name}
          // 이벤트 종류 = {현재(부모)컴포넌트에서 선언한 함수명}
          //-- 자식 컴포넌트에게 속성 전달(상속)
        />
      </ScrollView>
    </>
  );
};

export default Main;
