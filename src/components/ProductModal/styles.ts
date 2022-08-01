import styled, { css } from 'styled-components';
import { rotate } from '../LoadingContainer/styles';

type BadgeProps = {
  bg: string;
  name: string;
}

type OptionsContainerProps = {
  hasExtraLabel: boolean;
  hasOptional: boolean;
}

export const Background = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  min-width: 100vw;
  height: 100vh;
  min-height: 100%;
  position: fixed;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const Container = styled.div`
  position: fixed;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 0 20px 0 #0000004D;
  top: 5%;
  left: 5%;
  width: 90%;
  z-index: 999;
  /* height: 429px; */
`;

export const PictureContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Picture = styled.img`
  width: 100%;
  border-radius: 0.5rem;
  height: 15rem;
  object-fit: cover;
`;

export const CloseButton = styled.button`
  width: 2.125rem;
  height: 2.125rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #FD756B;
  top: 0.625rem;
  right: 0.625rem;
  position: absolute;

  .a {
    fill: #fff;
  }
`;

export const Description = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0.5rem 0.75rem 1.25rem;

  strong {
    font-size: 1.125rem;
    color: #272E47;
  }
  
  > p {
    font-size: 1rem;
    line-height: 1.25rem;
    color: #838484;
    margin-top: 0.5rem;
  }
`;

export const LoadingButton = styled.button`
  width: 2.3125rem;
  height: 2.3125rem;
  border-radius: 50%;
  background-color: #D3D5D7;
  align-items: center;
  justify-content: center;

  > svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

export const Badge = styled.div<BadgeProps>`
  height: 2.3125rem;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.25rem;
  font-size: 0.875rem;
  margin-right: 0.625rem;
  position: relative;

  background-color: ${({ bg }) => bg}; 
  color: ${({ name }) => name === 'Todos' ? '#fff' : '#272e47'}; 

  svg {
    margin-right: 0.375rem;
  }

  .a {
    fill: ${({ name }) => name === 'Todos' ? '#fff' : '#272e47'};
  }

  ${({ name }) =>
    name === 'Sem Açúcar' && css`
      border: 1px solid #272e47;
      color: #272e47;
  `}
`;

export const OptionalBadge = styled.div`
  padding: 0 0.625rem;
  border-radius: 0.75rem;
  border: 1px solid #272E47;
  display: flex;
  align-items: center;
  font-size: 0.625rem;
  position: absolute;
  height: 1.375rem;
  top: -0.75rem;
  background-color: #fff;
`;

export const Options = styled.div<OptionsContainerProps>`
  display: flex;
  width: 100%;
  margin-top:
    ${({ hasOptional }) => hasOptional ? '1.125rem' : '0.875rem'};
  /* height: 2.25rem; */
  align-items: ${({ hasExtraLabel }) => hasExtraLabel ? 'flex-end' : 'center'};

  p {
    font-size: 1.375rem;
    color: #333333;
    margin-left: auto;
    font-weight: bold;
  }
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;