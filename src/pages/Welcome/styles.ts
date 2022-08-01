import styled from 'styled-components';

type ColorProps = {
  color: string;
}

export const Container = styled.div`
  align-items: center;
  padding-bottom: 2.25rem;
  background-color: #CE4C4F;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const StripeContainer = styled.div<ColorProps>`
  width: 100%;
  position: absolute;
  height: 6.375rem;
  clip-path: polygon(100% 0, 100% 0, 0 100%, 0 0);
  background-color: ${({ color }) => color};
  z-index: 0;
`;

export const InputContainer = styled.div`
  width: 72%;
  margin-top: 1.25rem;
`;

export const Label = styled.p`
  color: #f7f7f7;
  font-size: 1.125rem;
`;

export const Input = styled.input`
  padding-left: 1rem;
  align-items: center;
  border-radius: 0.5rem;
  background-color: #F7F7F7;
  color: #2B2B2B;
  width: 100%;
  height: 3rem;
  margin-top: 0.625rem;
  display: flex;
  flex-direction: column;
  font-size: 1.125rem;
`;

export const ConfirmationButton = styled.button`
  width: 72%;
  height: 3rem;
  border-radius: 0.375rem;
  background-color: #98F7A7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4.25rem;
  flex-direction: column;
`;

export const ConfirmationButtonText= styled.p`
  font-family: 'Lato';
  color: #272E47;
  font-size: 1.125rem;
`;

export const MenuButton = styled.button`
  top: 7.5%;
  left: 1.5rem;
  display: flex;
  z-index: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
`;
