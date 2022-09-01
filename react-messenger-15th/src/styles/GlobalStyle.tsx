import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
const GlobalStyle = createGlobalStyle`
    ${normalize}
    body {
        margin: 0px;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: 'Noto Sans KR', sans-serif;
  
    }
    a:link { text-decoration: none; }
    a:visited { text-decoration: none; }
    a:hover { text-decoration: none; }
    a:active { text-decoration: none; }


    h1 {
        margin-bottom: 20px;
    }
    h4 {
        margin: 20px 0px;
    }
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(211, 211, 211,0.5);
        border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
        background-color: none;
    }
`;

export default GlobalStyle;
