import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { MenuButton } from '../../components/MenuButton';

// @ts-ignore
import { ReactComponent as AvatarIcon } from '../../assets/avatar.svg';
// @ts-ignore
import { ReactComponent as ReserveIcon } from '../../assets/reserve.svg';
// @ts-ignore
import { ReactComponent as PinIcon } from '../../assets/pin.svg';
// @ts-ignore
import { ReactComponent as CloseIcon } from '../../assets/close_white.svg';
// @ts-ignore
import { ReactComponent as AddPictureIcon } from '../../assets/add_picture.svg';

import {
  Container,
  Header,
  ReservationButton,
  ReservationButtonText,
  PinPointButton,
  InfoContainer,
  Avatar,
  Info,
  InfoTitle,
  InfoSubtitle,
  InfoButton,
  InfoButtonText,
  HeaderTitle,
  ClientNameButton,
  ClientNameText,
  CloseButton,
  StripeContainer,
} from './styles';

import { fetchCategories, fetchClient, fetchThemeColors } from '../../app/requests/general';
import { useApp } from '../../context/app';

export function Menu() {
  const { push } = useHistory()

  const { data: categories } = useQuery('categories', fetchCategories, { staleTime: 1000 * 60 * 10 })
  const { data: client } = useQuery('client', fetchClient, { staleTime: 1000 * 60 * 10 })

  const { data: colorTheme } =
    useQuery('colors', fetchThemeColors, { staleTime: 1000 * 60 * 10 })

  const {
    stripeBgColor,
    backgroundColor,
  } = useMemo(() => ({
    stripeBgColor: !!colorTheme ? colorTheme.top_one.value : '#fff',
    backgroundColor: !!colorTheme ? colorTheme.top_two.value : '#333',
  }), [colorTheme]);

  const { user, signed, handleSignOut } = useApp();

  const { infoTitle, infoSubtitle, infoButtonText } = useMemo(() => ({
    infoTitle: signed ? user.name : 'Faça o seu login',
    infoSubtitle: signed ? '927609440': 'em 10 segundos',
    infoButtonText: signed ? 'Sair' : 'Receba promoções exclusivas',
  }), [user, signed]);

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <Container
      color={backgroundColor}
    >
      <StripeContainer
        color={stripeBgColor}
      />
      <Header>
        <CloseButton onClick={() => push('/products')}>
          <CloseIcon
            style={{
              width: '0.875rem',
              height: '0.875rem',
            }}
          />
        </CloseButton>
        <ReservationButton
          href={!!client ? client.book_url : '/menu'}
        >
          <ReserveIcon />
          <ReservationButtonText>
            Reservar
          </ReservationButtonText>
        </ReservationButton>
        <PinPointButton
          href={!!client ? client.maps_url : '/menu'}
        >
          <PinIcon
            style={{
              width: '1.125rem',
              height: '1.125rem'
            }}
          />
        </PinPointButton>
      </Header>
      <InfoContainer>
        <Avatar
          onClick={() => signed ? () => {} : push('/welcome')}
        >
          {signed ? 
            <AddPictureIcon
              style={{
                width: '1.875rem',
              }}
            />
            :
            <AvatarIcon
              style={{
                width: '1.875rem',
                height: '1.875rem',
              }}
            />
          }
        </Avatar>
        <Info>
          <InfoTitle>{infoTitle}</InfoTitle>
          <InfoSubtitle>{infoSubtitle}</InfoSubtitle>
          <InfoButton onClick={() => signed ? handleSignOut() : () => {}}>
            <InfoButtonText>
              {infoButtonText}
            </InfoButtonText>
          </InfoButton>
        </Info>
      </InfoContainer>
      <ClientNameButton onClick={() => push('/about')}>
        <ClientNameText>
          {!!client ? client.name : ''}
        </ClientNameText>
      </ClientNameButton>
      <HeaderTitle>
        Ementa
      </HeaderTitle>
      {!!categories && 
        categories.map(({ id, name }) => 
          <MenuButton
            key={id}
            title={name}
            onClick={() => push('/products', { id })}
          />
        )
      }
    </Container>
  );
}
