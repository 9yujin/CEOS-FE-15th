import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0px;
        background-color: #8989bb;
        background-image: linear-gradient(315deg, #8989bb 0%, #a5a4cb 74%);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: 'Noto Sans KR', sans-serif;
    }
    h1 {
        margin-bottom: 20px;
    }
    h4 {
        margin: 20px 0px;
    }
`;

export default GlobalStyle;
