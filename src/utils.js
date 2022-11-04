export const validateEmail = (email) => {
  const mailCK =
    /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
  return mailCK.test(email);
}; // 이메일 형식에 맞는 값인지 확인

export const removeWhitespace = (text) => {
  // const spacesR = /\s/g;      // 공백제거
  // const IdCheck = /[(ㄱ-ㅎ가-힣ㅏ-ㅣ)]/g;   // 한글제거
  const IdCheck = /[(ㄱ-ㅎ가-힣ㅏ-ㅣ)||(\s)]/g; // 한글과 공백
  return (
    text.replace(IdCheck, "")
  );

}; 


// export const IdCheck = /[(ㄱ-ㅎ가-힣ㅏ-ㅣ)]/g;
// 한글 입력 불가 기능

// export const IdCheck = /(?=.*\d)(?=.*[a-z]).{8,}/gi;
// // 적어도 알파벳 하나, 숫자 하나가 포함되어 있는 문자열(8글자 이상/대소문자 구분하지않음)

// export const PwCheck =
//   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g;
// //최소 8자리, 숫자,문자,특수문자 최소 1개



