# 4주차 미션: React-Messenger 💌

## 서론

안녕하세요 🙌🏻 15기 프론트 파트장 **김주현**입니다.

이번주부터는 드디어 투두리스트에서 벗어나 새로운 프로젝트인 **messenger** 만들기를 진행합니다. 이번 미션은 저번 미션의 연장선으로, TypeScript와 다양한 React Hook에 익숙해지는 것을 목표로 합니다. 이번 주차에 중점적으로 사용하는 Hook은 React를 사용하면서 굉장히 자주 쓰이기 때문에 해당 부분을 중점적으로 공부해 보세요.

그럼 이번 미션도 파이팅입니다 ❤️‍🔥

# 미션

## 미션 목표

- TypeScript에 익숙해집니다.
- useState로 컴포넌트의 상태를 관리합니다.
- useEffect와 useRef의 사용법을 이해합니다.
- styled-components를 통한 CSS-in-JS 및 CSS Preprocessor의 사용법에 익숙해집니다.

## 기한

- 2022년 5월 6일 금요일 **(기한 엄수!)**

## 필수 요건

- 함수형 컴포넌트를 사용합니다.
- styled-components를 사용합니다.
- 컴포넌트 네이밍에 신경써 봅니다.
- UI는 자유롭게 구성하되, 반응형까진 고려하지 않으셔도 됩니다.

## 필수 구현 기능

- [결과 화면](https://corinth-messenger.vercel.app/)과같이 구현합니다.
- 채팅방 상단의 프로필을 클릭하면 사용자를 변경할 수 있습니다.
- 공백 입력 시 alert 메세지를 띄우고, 전송되지 않도록 합니다.
- 메세지를 보내면 채팅방 하단으로 스크롤을 이동시킵니다. (Hint: useEffect + scrollTo)
- 메세지에 유저 정보(프로필 사진, 이름)를 함께 표시합니다.
- user와 message 데이터를 json 형식의 파일에 저장합니다.

# 링크 및 참고자료

- [React docs - Hook](https://ko.reactjs.org/docs/hooks-intro.html)
- [React의 Hooks 완벽 정복하기](https://velog.io/@velopert/react-hooks#1-usestate)
- [useEffect 완벽 가이드](https://overreacted.io/ko/a-complete-guide-to-useeffect/)
- [리액트 프로젝트에서 타입스크립트 사용하기 (시리즈)](https://velog.io/@velopert/series/react-with-typescript)
