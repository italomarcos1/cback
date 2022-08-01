import React, { CSSProperties, ReactNode, useMemo }  from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { fetchThemeColors } from '../../app/requests/general';

// @ts-ignore
import { ReactComponent as Menu } from '../../assets/menu.svg';
import { useApp } from '../../context/app';

import {
  Container,
  StripeContainer,
  MainHeader,
  MenuAndTitle,
  Title,
  SubHeader
} from './styles';

type Props = {
  title: string;
  children?: ReactNode;
  headless?: boolean
  style?: CSSProperties;
}

export function Header({
  title,
  children,
  headless = false,
  style = {}
}: Props) {
  const { push } = useHistory();
  // const { colorTheme } = useApp();
  
  const { data: colorTheme } =
    useQuery('colors', fetchThemeColors, { staleTime: 1000 * 60 * 10 })

  const {
    backgroundColor,
    menuBgColor,
    fontColor,
    iconsColor
  } = useMemo(() => ({
    backgroundColor: !!colorTheme ? colorTheme.top_two.value : '#333',
    menuBgColor: !!colorTheme ? colorTheme.menu_bg.value : '#fff',
    fontColor: !!colorTheme ? colorTheme.top_text.value : '#fff',
    iconsColor: !!colorTheme ? colorTheme.top_icons.value : '#fff',
  }), [colorTheme])

  return (
    <Container headless={headless} style={style}>
      <MainHeader headless={headless} style={{ backgroundColor }}>
        <StripeContainer />
        <MenuAndTitle
          color={iconsColor}
        >
          <button onClick={() => push('/menu')}>
            <Menu />
          </button>
          <Title
            color={fontColor}
          >
            {title}
          </Title>
        </MenuAndTitle>
      </MainHeader>
      {!!children && 
      <SubHeader
        color={menuBgColor}
      >
        {children}
      </SubHeader>
      }
    </Container>
  );
}
