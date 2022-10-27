import React, { createContext, useState } from "react";

const ProgressContext = createContext({
  inProgress: false,  // inProgress: 스피너 컴포넌트의 렌더링을 결정 
  spinner: { start: () => {}, stop: () => {} }, // 스피너 컴포넌트의 시작과 끝을 알려줄 함수
}); 

// createContext: Context 객체를 만듭니다. Context 객체를 구독하고 있는 컴포넌트를 렌더링할 때 React는 트리 상위에서 가장 가까이 있는 짝이 맞는 Provider로부터 현재값을 읽습니다.
// 예제 : const MyContext = React.createContext(defaultValue);

const ProgressProvider = ({ children }) => {
  const [inProgress, setInProgress] = useState(false);  // 진행 상태 관리
  // inProgress: 진행중 (로딩 진행중)

  const spinner = {
    start: () => setInProgress(true),
    stop: () => setInProgress(false),
  };

  const value = { inProgress, spinner };
  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
// createContext로 만든 객체의 속성 설정 -- 예제 : <MyContext.Provider value={/* 어떤 값 */}>


export { ProgressContext, ProgressProvider };
