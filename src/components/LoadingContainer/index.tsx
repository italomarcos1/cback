import React, { CSSProperties } from 'react';

// @ts-ignore
import { ReactComponent as LoadingIcon } from '../../assets/loading_white.svg';

import { Container } from './styles';

type Props = {
  style?: CSSProperties;
}

export function LoadingContainer({ style }: Props){
  return (
    <Container style={style}>
      <LoadingIcon width="2rem" height="2rem" />
    </Container>
  );
}

