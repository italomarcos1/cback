import React from 'react';
import { useQuery } from 'react-query';

import { useHistory } from 'react-router-dom';

import {
  Container,
  Background,
  Button,
  ButtonText,
  ButtonTextBold,
  ButtonTextContainer,
  Shadow,
} from './styles'

// @ts-ignore
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Pt from '../../assets/pt.png';
import Usa from '../../assets/usa.png';

// @ts-ignore
import { ReactComponent as Cback } from '../../assets/cback_logo.svg';
import { fetchThemeColors } from '../../app/requests/general';
import { LoadingContainer } from '../../components/LoadingContainer';

export function FirstScreen() {
  const { push } = useHistory();

  const { isLoading } = useQuery('colors', fetchThemeColors, { staleTime: 1000 * 60 * 10 })

  return (
    <Container>
      <Background>
        <Shadow />
        <Logo
          style={{
            // width: '70%'
            zIndex: 1
          }}
          width="80%"
          height="25%"
        />
        {isLoading ? 
          <LoadingContainer />
        :
        <>
          <Button
            onClick={() => push('/loading')}
            disabled={isLoading}
          >
            <img
              src={Pt}
              style={{
                width: '2.25rem',
                height: '2.25rem'
              }}
              alt="Pt"
            />
            <ButtonTextContainer>
              <ButtonText>Idioma</ButtonText>
              <ButtonTextBold>Português</ButtonTextBold>
            </ButtonTextContainer>
          </Button>
          <Button
            onClick={() => push('/loading')}
            disabled={isLoading}
            style={{
              marginTop: '2.5rem'
            }}
          >
            <img
              src={Usa}
              style={{
                width: '2.25rem',
                height: '2.25rem'
              }}
              alt="Usa"
            />
            <ButtonTextContainer>
              <ButtonText>Language</ButtonText>
              <ButtonTextBold>English</ButtonTextBold>
            </ButtonTextContainer>
          </Button>
        </>}
        <Cback
          style={{
            marginTop: 'auto',
            height: '1.5rem'
          }}
        />
      </Background>
    </Container>
  );
}
