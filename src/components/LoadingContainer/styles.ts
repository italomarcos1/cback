import styled, { keyframes } from 'styled-components';

export const rotate = keyframes` /** widtwidtwidth: 840px;h: 840px;h: 840px;animação para rotacionar o icon. */
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
  svg {
    animation: ${rotate} 2s linear infinite;
  }
  display: flex;
  justify-content: center;
  margin-top: 8rem;
`;
