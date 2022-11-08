import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import Auth from "./Auth";
import { UserContext, ProgressContext } from "../contexts";
import Main from "./Main";
import { Spinner } from "../components"; // 어떤 화면이든 가리기위해 navigations폴더의 index파일에 임포트

const Navigation = () => {
  const { user } = useContext(UserContext);
  const { inProgress } = useContext(ProgressContext);

  return (
    <NavigationContainer> 
    {/* NavigationContainer: 앱 상태를 관리하고 최상위 네비게이터를 앱 환경에 연결하는 일을 담당 */}
      {/* {user.uid ? <Main /> : <Auth />}  */}
      <Main /> 
      {/* 로그인 여부에 따라 다른 네비게이션이 이용 될 것 */}
      {inProgress && <Spinner />}  
      {/* // inProgress값에 따라 Spinner 컴포넌트 렌더링 */}
    </NavigationContainer> 
  );0
};

export default Navigation;
