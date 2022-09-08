# Deployment

https://react-vote-15th-pokedon.vercel.app/

# TODO

* [x] 로그인: 사용자 로그인 여부는 JWT를 통해 인증한다.
* [x] 로그인: 아이디 혹은 비밀번호가 틀렸을 시에는 에러를 response한다.
* [x] 로그아웃
* [x] 회원가입: 회원가입에 필요한 필드는 아이디, 비밀번호, 이메일이다.
* [x] 회원가입: 아이디, 이메일은 중복될 수 없다.
* [x] 투표: 후보는 득표 순으로 내림차순 정렬되어 보여진다.
* [x] 투표: 로그인하지 않은 사용자는 투표 페이지에 접근할 수는 있되, 투표는 불가능하다.
* [x] `Promise.then()` 보단 `async/await`를 사용한다.



# 구현 사항

뱅키즈 프로젝트에 바로 이식 하여 사용할 것을 계획하여, 다소 복잡하지만 JWT를 활용한 Auth 관련 코드를 정석에 가깝게 작성했습니다.

 

## 0. boilerplate 세팅

* **코어**: React, TypeScript
* **상태관리**: Redux with RTK, Redux Thunk
* **스타일링**: Styled-components, Global Theming (Context API)

## **1. 회원가입 페이지 구현 (Form Validation, Axios User Registration Form Submit)**

- 사용자 이름, 비밀번호, 비밀번호 확인, 이메일 각 입력에 대한 유효성 검증
  - 각 입력에 대해 에러 메세지 랜더링 조건
    - 해당 입력에 포커스 && 해당 입력의 값이 존재 && 유효하지 않은 입력 (정규표현식)
- **access token은 encoded 상태로 memory(App state)를 통해 관리, refresh token은 http only, secure cookie를 통해 관리**
  - **access token의 payload 데이터 필요 시 직전에 decode 하여 사용**
  - **token 정보를 localStorage, 보안 설정되지 않은 cookie에 저장 시 XSS, CSRF 등 보안이슈 발생**

- 데이터 반입 과정에서 발생하는 에러 메세지 랜더링
  - '이미 사용된 이메일 입니다.'
- 서버로 요청 전송 직전 입력에 대한 유효성 추가 검증
- production mode가 아닌 경우 react-devtools, redux-devtools disable

## **2. 로그인 페이지 구현 (User Login and Authentication with Axios)**

- localStorage에 이메일(ID) 저장, 페이지 재진입 시 입력 값 유지
- 자동 로그인 선택 시 해당 **여부만**을 localStorage에 저장 (Persist Login)
- 데이터 반입 과정에서 발생하는 에러 메세지 랜더링
  - '아이디, 비밀번호를 확인해주세요.'
- 로그인 시 접근하고자 했던 페이지 혹은 홈으로 navigate

## **3. 라우팅 구현 (Protected Routes, Role-Based Authorization)**

- 유저의 소속 파트에 따라 해당 파트의 투표 페이지에만 접근 가능
  - 타 파트 투표 페이지 접근 시 Unauthorized 페이지로 route
- 비로그인 상태로 홈, 로그인, 회원가입 외의 페이지 접근 시 로그인 페이지로 route
  - 로그인 시 접근하고자 했던 페이지로 navigate

## **4. JWT 관리 (Login Authentication with JWT Access, Refresh Tokens with Axios interceptors)**

### **4.1. \*`useRefreshToken` 구현: refresh access token**

1. refresh token을 cookie에 포함하여 request
2. response new access token
3. new access token을 App state에 overwrite
4. return new access token

### **4.2. `useAxiosPrivate` 구현: 특정 권한에 따른 Axios request**

usePrivateAxios는 interceptors를 포함한 axios instance를 반환하는 hook이다. 특정 권한이 요구되는 request에 대해 interceptors를 통해 request 시 header의 Authorization field에 access token을 포함하도록 한다. 또한 access token 만료에 따른 request 실패 시 access token을 갱신하고 Authorization field에 new access token을 포함하도록 한다.

- **requestIntercept (request에 대한 middleware)**
  1. header의 Authorization field가 비어있는 경우 (초기상태), App state에 저장된 access token을 할당한다.
- **responseIntercept (response에 대한 middleware)**
  - **reponse가 정상인 경우**
    1. reponse를 반환한다.
  - **response가 비정상인 경우 (error)**
    1. prevRequest를 백업한다.
    2. access token이 만료된 경우 (error.response.status == 401) access token을 갱신한다. (*`useRefreshToken`)
    3. 갱신된 access token을 바탕으로 prevReqest를 재진행 한다.
    4. refresh token이 만료된 경우 usePrivateAxios hook을 사용한 컴포넌트 내부에서 error catch 하여 loginPage로 navigate

## **5. 자동 로그인, 로그아웃 구현 (Persistent User Login Authentication with JWT Tokens)**

### **5.1. 자동 로그인 구현**

- 특정 권한이 필요한 페이지에 접근하는 라우팅 과정: **PersistLogin** -> **RequireAuth** -> **해당 페이지 (nested routing)**

- **RequireAuth**: 유저의 권한에 따라 특정 페이지 접근을 제한

- **PersistLogin**: RequreAuth로 접근하기 전 app state를 확인하여, 해당 값이 비어있는 경우 (새로고침 시) 재로그인 진행
  - **app state의 access token이 empty인 경우 (새로고침)**
    - access token과 유저 정보를 재할당 (*`useRefreshToken`) (재로그인)
    - 해당 과정은 로그인 시 localStorage에 저장한 자동로그인 여부에 따라 생략
  - **app state의 access token이 empty가 아닌 경우 (페이지 이동)**
    - 재로그인 절차 생략

### **5.2. 로그아웃 구현**

- reset App state
- request를 통해 서버의 refresh token을 만료 진행 (blank 초기화)

## 6. RTK 비동기 처리

ex. 후보자 조회 api를 통해 가져온 값을 리덕스 스토어에 저장

- axios get 요청으로 값을 받아와 data를 리턴하는 함수

  ```jsx
  import { API, privateAPI } from './axiosConfig';
  export const getCandidates = async (part: string) => {
    const response = await API.get(`/candidates/?part=${part}`);
    return response.data;
  };
  ```

- `createAsyncThunk`를 통해 thunk를 RTK에서 사용할 수 있다.

- slice의 extraReducers에서 thunk의 결과를 받아오는데,

- `createAsyncThunk`에서 에러를 catch해 버리면 리듀어에서는 에러를 받지 못해 무조건 fulfilled로 처리된다. 오류가 나는 상황에선 `rejectWithValue`를 이용하면 reject로 넘겨 처리할 수 있다.

  ```jsx
  export const getCandidateThunk = createAsyncThunk(
    'candidate/getCandidate',
    async (part: string, { rejectWithValue }) => {
      const res = await getCandidates(part);
      console.log(res);
      if (!res) {
        rejectWithValue('error');
      }
      return res.detail;
    },
  );
  ```

## 7. 메인, 투표, 투표 현황 페이지


- 투표하기 버튼 클릭 시 로그인이 되어 있지 않으면 로그인 페이지로 이동.
- 메인페이지에서 로그인이 되어있는 상태 : 자신의 파트만 활성화
- pending 상태 시 로딩.
- 투표 : 후보자 박스 클릭 시 선택 / 박스 부분 제외한 여백 클릭 시 선택 해제
- 투표 현황 : 동점자 처리, 1등 표시 : 귀여움
- unAuthorized 페이지 : 여기도 귀여움 ㅋ

<br/>
<br/>

```
# 마지막 미션: React vote! 🗳

# 서론

어느덧 마지막 스터디에 다다랐습니다. 그동안 여러분들께 개인적인 성장이 있었길 바라는 마음입니다.

이번 스터디는 각 팀의 백엔드와 함께 진행합니다. 모던 웹에서 REST API가 주류로 떠오름에 따라 프론트엔드와 백엔드의 구분이 이전보다 명확해졌습니다. 주로 백엔드는 API 서버의 역할을, 프론트엔드는 이를 이용해 사용자에게 UI를 제공하는 역할로 웹이 분화되었습니다. 그 말은 곧, API 없이는 사용자에게 의미있는 서비스를 제공하기 힘들어진다는 것이겠죠. 여러분께서도 차후 팀 프로젝트를 진행하시면서 백엔드 개발자들과 API에 대해 소통할 일이 많아질 것입니다.

따라서 이번 과제는 백엔드 개발자들이 전달해준 API를 사용해 보는 미션입니다. 일종의 투표 서비스를 개발해 보는 것인데요. 백엔드 개발자와 함께 클라이언트 사이드에서 API를 조금 더 효율적으로 사용할 수 있는 방법에 대해 고민해 보고, 논의해 보는 시간을 가져 보시기 바랍니다.

# 미션

## 미션 목표

- REST API, AJAX등을 통한 서버와의 통신 방법을 이해합니다.
- async/await, Promise등 JavaScript의 비동기 처리를 이해합니다.
- API document를 통해 백엔드 개발자와 소통하는 방법을 익힙니다.
- 팀 내의 프론트엔드 개발자와 적절한 역할 분담을 통해 개발 효율을 높이는 방법에 대해 고민합니다.

## 제출 기한

2022년 6월 24일 금요일

## 필수 요건

- UI/UX에 대한 감각을 최대한 발휘해 디자인을 적용해 봅니다.
- HTTPS를 통해 서버와 통신합니다.
- 외의 사항은 기획 문서를 참고하세요.

## 선택 요건

- API Fetch는 어떤 방식을 사용하든 무방합니다 (axios, Fetch API, $.ajax)
- `Promise.then()` 보단 `async/await`를 사용해 보세요. 더 최신 스펙이랍니다.
```
