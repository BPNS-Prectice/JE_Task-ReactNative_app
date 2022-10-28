// 최신 코드 주의할 것

import { initializeApp } from "firebase/app";
import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
 } from "firebase/auth";
import config from "../firebase.json";

const app = initializeApp(config);

const auth = getAuth(app);

export const signin = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

// --------------------------------------------------------------------------------------

 
export const signup = async ({ name, email, password, introduce }) => {
  const { user } = await createUserWithEmailAndPassword(auth, name, email, password, introduce);   // 1. 유저 생성
  await updateProfile(auth.currentUser, { displayName: name });    // 2. 생성된 유저의 updateProfile함수를 이용해서 displayName: name을 수정한다
  return user;  // 3. 완료되면 생성된 유저 반환
};
