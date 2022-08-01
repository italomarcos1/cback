import styled from 'styled-components';

import Bg from '../../assets/bg.png';

export const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1c1c1c;
  /* flex: 1; */
  align-items: center;
  padding-top: 3.125rem;
  padding-bottom: 2.25rem;
  justify-content: space-between;
  background-image: url(${Bg});
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  position: relative;
`;

export const Shadow = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%); 
  top: 0;
  left: 0;
  /* z-index: 0; */
`;

export const Button = styled.button`
  width: 100%;
  height: 4rem;
  background-color: rgba(46, 51, 52, 0.7);
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 35%;
  display: flex;
`;

export const ButtonText = styled.p`
  color: #fff;
  font-size: 0.75rem;
  line-height: 1.375rem;
`;

export const ButtonTextBold = styled(ButtonText)`
  font-size: 1.25rem;
  line-height: 1.375rem;
  font-weight: 700;
`;

export const ButtonTextContainer = styled.div`
  margin-left: 0.625rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;