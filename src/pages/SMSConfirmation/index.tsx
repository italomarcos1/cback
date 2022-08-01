import React from 'react';
import { useHistory } from 'react-router-dom';

// @ts-ignore
import { ReactComponent as Logo } from '../../assets/logo.svg';

// @ts-ignore
import { ReactComponent as Stripe } from '../../assets/stripe_home.svg';

import {
  Container,
  ConfirmationContainer,
  Label,
  InputAndSendContainer,
  InputContainer,
  Input,
  SendMessageButton,
  ReceiveCodeWarning,
  SMSCodeContainer,
  SMSCodeInput,
  ConfirmationButton,
  ConfirmationButtonText,
  PhoneCode,
} from './styles';

export function SMSConfirmation() {
  const { push } = useHistory()

  return (
    <Container>
      <Stripe style={{ position: 'absolute', width: '100%', top: '-2%' }} />
      <Logo />
      <ConfirmationContainer>
        <Label>Telemóvel</Label>
        <InputAndSendContainer>
          <InputContainer>
            <PhoneCode>DDD</PhoneCode>
            <Input />
          </InputContainer>
          <SendMessageButton
            onClick={() => {}}
          />
        </InputAndSendContainer>
        <ReceiveCodeWarning>
          Você receberá um SMS com{"\n"}um código de acesso
        </ReceiveCodeWarning>
      </ConfirmationContainer>
      <SMSCodeContainer>
        <SMSCodeInput />
        <SMSCodeInput />
        <SMSCodeInput />
        <SMSCodeInput />
      </SMSCodeContainer>
      <ConfirmationButton onClick={() => push('/welcome')}>
        <ConfirmationButtonText>
          Entrar
        </ConfirmationButtonText>
      </ConfirmationButton>
    </Container>
  );
}
