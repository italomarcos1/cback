import styled, { css } from 'styled-components';

type ColorProps = {
  color: string;
}

export const Container = styled.div<ColorProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 11.5rem;
  background-color: ${({ color }) => color};
  position: relative;
  width: 100%;
  min-height: 100%;
`;

export const StripeContainer = styled.div<ColorProps>`
  width: 100%;
  position: absolute;
  height: 12rem;
  top: 0;
  z-index: 0;
  clip-path: polygon(100% 0, 100% 53%, 0 100%, 0 47%);
  background-color: ${({ color }) => color};
`;

export const Header = styled.div`
  width: 83%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3rem;
  margin-bottom: 0.75rem;
  z-index: 1;
`;

export const ReservationButton = styled.a`
  width: 10.5rem;
  height: 3.125rem;
  border-radius: 1.5625rem;
  background-color: #FFCD7D;
  align-items: center;
  justify-content: center;
  display: flex;
  z-index: 1;
`;

export const ReservationButtonText = styled.p`
  font-family: 'Lato';
  color: #272E47;
  font-size: 1.125rem;
  margin-left: 0.375rem;
`;

const baseButton = css`
  width: 2.125rem;
  height: 2.125rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CloseButton = styled.button`
  ${baseButton}
  background-color: #FD756B;
`;

export const PinPointButton = styled.a`
  ${baseButton}
  background-color: #0173B1;
`;

export const InfoContainer = styled.div`
  width: 83%;
  margin-top: 1.625rem;
  display: flex;
  flex-direction: row;
  z-index: 1;
`;

export const Avatar = styled.button`
  height: 4.375rem;
  width: 4.375rem;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #fff;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const Info = styled.div`
  margin-left: 1.125rem;
  height: 4.375rem;
`;

export const InfoTitle = styled.p`
  font-weight: bold;
  color: #fff;
  font-size: 1.125rem;
`;

export const InfoSubtitle = styled.p`
  color: #fff;
  font-size: 0.875rem;
`;

export const InfoButton = styled.button`
  color: #fff;
  font-size: 0.875rem;
  margin-top: auto;
`;

export const InfoButtonText = styled.p`
  color: #FFCC78;
  font-size: 1rem;
  `;

export const ClientNameButton = styled.button`
  width: 83%;
  background-color: #FFCC78;
  border-radius: 0.375rem;
  margin-top: 2.25rem;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  display: flex;
  z-index: 1;
`;

export const ClientNameText = styled.p`
  font-family: 'Lato';
  color: #272E47;
  font-size: 1.125rem;
`;

export const HeaderTitle = styled.p`
  font-family: 'Lato';
  color: #fff;
  font-size: 1.375rem;
  font-weight: bold;
  margin-top: 1.25rem;
`;