import styled, { keyframes } from 'styled-components';

type ColorProps = {
  color: string;
}

export const Container = styled.div<ColorProps>`
  flex: 1;
  align-items: center;
  padding-bottom: 2.25rem;
  background-color: ${({ color }) => color};
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const StripeContainer = styled.div<ColorProps>`
  width: 100%;
  position: absolute;
  height: 6.375rem;
  clip-path: polygon(100% 0, 100% 0, 0 100%, 0 0);
  background-color: ${({ color }) => color};
  z-index: 0;
`;

export const LoadingText = styled.p`
  font-size: 1.625rem;
  color: #fff;
  margin-top: 2.5rem;
  font-family: 'Bebas Neue';
`;

const rotate = keyframes` /** widtwidtwidth: 840px;h: 840px;h: 840px;animação para rotacionar o icon. */
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const LoadingContainer = styled.div`
  margin-top: 20%;
  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;