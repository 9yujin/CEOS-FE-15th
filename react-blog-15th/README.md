### 배포링크
[https://react-blog-15th-dhra2rce1-9yujin.vercel.app/](https://react-blog-15th-dhra2rce1-9yujin.vercel.app/)

### TODO

- [x] 기본적인 CRUD를 구현합니다.
- [x] 메인 페이지, 포스트 상세 페이지, 에디터 페이지로 구성합니다.
- [x] 메인 페이지에서는 각 포스트들의 제목과 작성 날짜를 리스트 형태로 보여줍니다.
- [x] 포스트 상세 페이지에서는 제목, 작성일, 본문의 내용을 표시합니다.
- [x] 포스트를 수정할 때에는 기존에 작성된 내용을 에디터 페이지로 불러옵니다.
- [x] 포스트 삭제 기능을 구현합니다.
- [x] 성능 최적화를 위한 방법을 적용해 봅니다.
- [x] [Optional] 웹 폰트를 사용합니다.
- [ ] [Optional] 카테고리 기능을 구현합니다.

### Directory Structure

* **/pages**: auto routed pages by next.js
  * **index.tsx**: Entry point file that renders the React component tree
  * **_app.tsx**: providers
  * **store.tsx**: store setup
  * **rootReducer.tsx**: root reducer (optional)
* **/store**
  * **/modules**
    * **todoSlice.tsx**: 리듀서 모듈
    * **index.tsx**: 리듀서 모듈 통합
  * **index.tsx**: (store 생성 && wrapper 생성)
* **/freatures**:  contains all feature folders
  * **/todos**: a single feature folder
    * **Todos.tsx**: a React component
* **/hooks**: custom hooks

* **/shared**: util functions, interfaces, enums

* **/styles**: global style (+reset), theme (+media query)

# Key Questions

### Next.js를 사용하는 이유, SEO란?

Next.js는 React를 기반으로 한 Framework이며, SSR를 구현하고 SEO에 유리하기 때문에 사용한다. Next.js는 Server에서 받은 사용자의 접속 요청을 초기에 SSR방식으로 렌더링 될 HTML을 보내고, 브라우저에서 JavaScript를 다운로드하고 React를 실행하기 때문에 SEO가 가능하다. 또한 다른 페이지로 이동할 경우 CSR방식으로 Server가 아닌 브라우저에서 처리함으로써 SPA장점도 유지할 수 있다.

1. **SSR 구현의 편의**

SSR 이나 Code Splitting 같은 기능을 직접 구축하여 사용하는 것은 유지보수 측면에서 부담이 된다.

> **Next.js의 작동원리**
>
> 1. 초기에 사용자가 Server에 페이지 접속을 요청하면, SSR 방식으로 랜더링 될 HTML을 보낸다.
> 2. 브라우저에서 JavaScript를 다운로드하고 React를 실행한다.
> 3. 사용자, 페이지가 서로 상호작용하여 다른 페이지로 이동할 땐, SSR이 아닌 CSR 방식으로 브라우저에서 필요한 작업을 처리한다.

2. **검색 엔진 최적화 (Search Engine Optimization)**

CSR은 검색 엔진 최적화에 불리하기 때문에 SSR을 구현하여 검색 엔진 최적화를 실현할 수 있다.

> **검색 엔진 작동 원리**
>
> 검색 엔진 봇들은 사이트의 데이터를 크롤링 할 때, JavaScript 파일을 해석할 수 없다는 특징을 가졌다. 때문에 HTML 파일에서 크롤링을 진행한다. 
>
> CSR 방식은 Client 측에서 페이지를 구성하기 전까지 HTML에 아무것도 없으므로 데이터를 수집할 수 없는 상태이기 때문에 검색 엔진 노출이 불리하다.
>
> 반면 SSR은 Server 측에서 화면을 그려서 보내주는 방식이다. 때문에 HTML 안에 이미 컨텐츠들을 포함하고 있는 상태이며, 크롤러 봇들이 데이터를 수집하는데 수월하다.

### 성능 최적화를 위해 사용한 방법

포스트 상세 페이지의 경우 SSG로 구현했습니다. SSR, SSG에 대한 이해가 부족하여, 리덕스 내의 전역 상태를 업데이트 하는 과정에서 생긴 오류를 해결하지 못하고 과제를 제출합니다.

### 전반적인 협업 과정

각자 이름으로 브랜치를 만들어서 기능단위로 작업 후 dev 브랜치에 merge 하며 진행했습니다. 본 프로젝트에서는 깃 플로우를 공부해서 체계적인 협업을 진행해야겠다고 생각했습니다.

<br/>

---

<br/>

```
# 6주차 미션: React-Blog 📄

# 서론

이번주에는 새 프로젝트인 블로그 만들기를 진행합니다. 
이번 과제에서는 Next.js를 사용해 보며 SSR을 이해하고, 
각 팀별로 미리 호흡을 맞춰 보는 좋은 기회가 될 것 같습니다.

# 미션

## 미션 목표

- Next.js 사용법을 공부해 봅니다.
- 성능 최적화를 위한 방법을 적용해 봅니다.
- Git을 이용한 협업 방식에 익숙해집니다.

## 기한

- 2022년 5월 20일 금요일

## 필수 요건

- 기본적인 CRUD를 구현합니다.
- 메인 페이지, 포스트 상세 페이지, 에디터 페이지로 구성합니다.
- 메인 페이지에서는 각 포스트들의 제목과 작성 날짜를 리스트 형태로 보여줍니다.
- 포스트 상세 페이지에서는 제목, 작성일, 본문의 내용을 표시합니다.
- 포스트를 수정할 때에는 기존에 작성된 내용을 에디터 페이지로 불러옵니다.
- 포스트 삭제 기능을 구현합니다.
- 성능 최적화를 위한 방법을 적용해 봅니다.

## 선택 사항

- 웹 폰트를 사용합니다.
- 카테고리 기능을 구현합니다.
- 그 외에 자유롭게 기능을 추가해 주세요!
```
