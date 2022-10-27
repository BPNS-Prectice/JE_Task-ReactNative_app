import React, { createContext, useState } from "react";

const ProgressContext = createContext({
  inProgress: false,  // inProgress: 스피너 컴포넌트의 렌더링을 결정 
  spinner: { start: () => {}, stop: () => {} }, // 스피너 컴포넌트의 시작과 끝을 알려줄 함수
}); 

const ProgressProvider = ({ children }) => {
  const [inProgress, setInProgress] = useState(false);
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

export { ProgressContext, ProgressProvider };
