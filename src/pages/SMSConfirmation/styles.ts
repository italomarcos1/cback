import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  align-items: center;
  padding-bottom: 2.25rem;
  background-color: #CE4C4F;
  position: relative;
`;

export const ConfirmationContainer = styled.div`
  width: 72%;
  margin-top: 2rem;
`;

export const Label = styled.p`
  color: #f7f7f7;
  font-size: 1.125rem;
  font-family: 'Lato';
`;

export const InputAndSendContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.625rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1.5rem 0 0.75rem;
  border-radius: 0.5rem;
  background-color: #F7F7F7;
  width: 78%;
  height: 3rem;
`;

export const Input = styled.input`
  font-size: 1.125rem;
  color: #2b2b2b;
  font-family: 'Lato';
  padding-left: 0.25rem;
`;

export const PhoneCode = styled.p`
  font-size: 1.125rem;
  color: #2b2b2b;
  font-family: 'Lato';
  border-style: solid;
  border-right-width: 1.25px; 
  border-color: #FFCC78;
  padding-right: 0.25rem;
`;

export const SendMessageButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  background-color: #FFCC78;
`;

export const ReceiveCodeWarning = styled.p`
  font-family: 'Lato';
  color: #FFCC78;
  font-size: 1rem;
  line-height: 1.375rem;
  margin-top: 0.625rem;
`;

export const SMSCodeContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 72%;
  margin-top: 2rem;
  justify-content: space-between;
`;

export const SMSCodeInput = styled.input`
  width: 3.625rem;
  height: 3.625rem;
  border-radius: 50%;
  background-color: #f7f7f7;
  color: #272E47;
  text-align: center;
  font-size: 1.5rem;
  font-family: 'Lato';
`;

export const ConfirmationButton = styled.button`
  width: 72%;
  height: 3rem;
  border-radius: 0.375rem;
  background-color: #98F7A7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.625rem;
`;

export const ConfirmationButtonText= styled.p`
  font-family: 'Lato';
  color: #272E47;
  font-size: 1.125rem;
`;