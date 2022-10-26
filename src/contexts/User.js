import React, { createContext, useState } from "react";

const UserContext = createContext({
  user: { uid: null },
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUserInfo] = useState({});
  const setUser = ({ uid }) => {
    setUserInfo({ uid });
  };
  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// 파이어베이스에 등록된 uid를 이용하여 로그인 여부 판단


export { UserContext, UserProvider };
