import {
    createGlobalStyle
} from 'styled-components';

const GlobalStyle = createGlobalStyle `  
   *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    }
  *:focus {
    outline: 0;
    outline: none;
    }

    html {
    font-size: 62.5%;
    box-sizing: border-box;
    }
    body {
        font-size : 1.6rem;
        font-family : 'Roboto', sans-serif;
        line-height: 1.6;
        background-color : ${ ({ theme }) => theme.colors.bg };
    }
`;



export default GlobalStyle;