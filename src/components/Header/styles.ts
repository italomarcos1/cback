import styled, { css } from 'styled-components';

import Stripe from '../../assets/stripe.svg';

type Props = {
  headless: boolean;
}

type ColorProps = {
  color: string;
}

export const Container = styled.div<Props>`
  width: 100%;
  position: fixed;
  
  ${({ headless }) => headless && css`
    z-index: 1;
    position: absolute;
    top: 0.625rem;
  `};
`;

export const MainHeader = styled.div<Props>`
  align-items: flex-end;
  background-color: ${({ headless }) => headless ? 'rgba(0,0,0,0)' : '#CE4C4F'};
  position: relative;
  height: 5.5rem;
  justify-content: space-between;
  width: 100%;
  display: flex;
`;

export const StripeContainer = styled.div`
  width: 100%;
  background-image: url(${Stripe});
  background-repeat: no-repeat;
  position: absolute;
  height: 8.75rem;
  background-size: cover;
  z-index: 0;
`;

export const MenuAndTitle = styled.div<ColorProps>`
  align-items: center;
  display: flex;
  z-index: 1;
  padding: 0 1rem 0.75rem;

  .a {
    fill: ${({ color }) => color};
  }
`;

export const Title = styled.p<ColorProps>`
  color: ${({ color }) => color};
  font-size: 1.125rem;
  margin-left: 1.25rem;
`;

export const SubHeader = styled.div<ColorProps>`
  width: 100%;
  background-color: ${({ color }) => color};
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  padding: 0.75rem 0.75rem 1rem;
`;