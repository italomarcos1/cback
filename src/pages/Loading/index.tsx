import React, { useCallback, useEffect, useMemo } from 'react';

import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

// @ts-ignore
import { ReactComponent as Logo } from '../../assets/logo.svg';
// @ts-ignore
import { ReactComponent as Cback } from '../../assets/bottom.svg';
// @ts-ignore
import { ReactComponent as LoadingIcon } from '../../assets/loading.svg';
// import LoadingIcon from '~/assets/loading.svg';

import { Container, LoadingContainer, LoadingText, StripeContainer } from './styles';
import { fetchAllProducts, fetchCategories, fetchClient, fetchThemeColors } from '../../app/requests/general';

export function Loading() {
  const { push } = useHistory();

  useQuery('categories', fetchCategories, { staleTime: 1000 * 60 * 10 });
  useQuery('client', fetchClient, { staleTime: 1000 * 60 * 10 });
  const { data: colorTheme } =
    useQuery('colors', fetchThemeColors, { staleTime: 1000 * 60 * 10 })

  const {
    stripeBgColor,
    backgroundColor,
  } = useMemo(() => ({
    stripeBgColor: !!colorTheme ? colorTheme.top_one.value : '#fff',
    backgroundColor: !!colorTheme ? colorTheme.top_two.value : '#333',
  }), [colorTheme]);

  const { isSuccess } =
    useQuery('products', fetchAllProducts, { staleTime: 1000 * 60 * 10 });
  
  useEffect(() => {
    if(isSuccess) push('/products');
  }, [isSuccess, push])

  return (
    <Container
      color={backgroundColor}
    >
      <StripeContainer
        color={stripeBgColor}
      />
      <Logo
        style={{
          marginTop: '15%',
          zIndex: 1
        }}
        width="80%"
        height="25%"
      />
      <LoadingContainer>
        <LoadingIcon />
      </LoadingContainer>
      <LoadingText>
        Estamos a carregar a ementa
      </LoadingText>
      <Cback
        style={{
          marginTop: 'auto',
          height: '2rem'
        }}
        width="auto"
        height="auto"
      />
    </Container>
  );
}
