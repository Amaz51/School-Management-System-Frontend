import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Segoe UI', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f3f4f6;
    color: #111827;
  }

  input, button {
    font-family: inherit;
  }
`;

export default GlobalStyle;
