import React, { ButtonHTMLAttributes } from 'react';

import { Container, Text } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export function MenuButton({ title, onClick }: Props) {
  return (
    <Container onClick={onClick}>
      <Text>
        {title}
      </Text>
    </Container>
  );
}
