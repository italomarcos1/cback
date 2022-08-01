import { createGlobalStyle } from 'styled-components'

// @ts-ignore
import bebasNeue from '../assets/fonts/BebasNeue.otf'

export const GlobalStyle =  createGlobalStyle`
  @font-face {
    font-family: 'Bebas Neue';
    src: local('Bebas Neue'), url(${bebasNeue}) format('opentype');
    font-weight: 400;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  input {
    touch-action: none;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    overflow-x: hidden;
    font-size: 1rem;
    font-family: 'Lato';
  }

  html {
    height: 100vh;
  }

  body, #root {
    height: 100%;
  }

  #root {
    background-color: #fff;
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
    background-color: #00000000;
  }

  h1, h2, h3, h4, h5, h6, strong, li {
    font-family: 'Lato', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, p, span, strong, div {
    letter-spacing: 0.5px;
  }

  li {
    list-style: none;
  }

  p, span, a, figcaption {
    font-family: 'Lato', sans-serif;
  }

  input {
    border: none;
  }

  textarea, input[type="text"] {
      -webkit-appearance: none;
    }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    transition: all .3s ease-in-out;

    &:hover {
      transition: all .3s ease-in-out;
    }
  }
`
