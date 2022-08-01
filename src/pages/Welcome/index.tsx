import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useApp } from '../../context/app';

// @ts-ignore
import { ReactComponent as Logo } from '../../assets/logo.svg';
// @ts-ignore
import { ReactComponent as Cback } from '../../assets/bottom.svg';
// @ts-ignore
import { ReactComponent as Menu } from '../../assets/menu.svg';

import { CustomSelect as Select } from '../../components/Select';

import {
  Container,
  MenuButton,
  Label,
  InputContainer,
  Input,
  ConfirmationButton,
  ConfirmationButtonText,
  StripeContainer,
} from './styles';
import { DefaultValueProps } from '../../types/general';
import { fetchThemeColors } from '../../app/requests/general';
import { useQuery } from 'react-query';
// import { MonthSelect } from '~/components/MonthSelect';

export function Welcome() {
  const [name, setName] = useState('');
  const [month, setMonth] = useState('');

  const { push } = useHistory();
  const { setUser, setSigned } = useApp();

  const handleSignIn = useCallback(() => {
    setUser({ name: !!name ? name : 'Cliente', month });
    setSigned(true);
    push('/menu')
  }, [name, month, push]);

  const monthsData = useMemo<DefaultValueProps[]>(() => [
    { value: 'Janeiro', label: 'Janeiro' },
    { value: 'Fevereiro', label: 'Fevereiro' },
    { value: 'Março', label: 'Março' },
    { value: 'Abril', label: 'Abril' },
    { value: 'Maio', label: 'Maio' },
    { value: 'Junho', label: 'Junho' },
    { value: 'Julho', label: 'Julho' },
    { value: 'Agosto', label: 'Agosto' },
    { value: 'Setembro', label: 'Setembro' },
    { value: 'Outubro', label: 'Outubro' },
    { value: 'Novembro', label: 'Novembro' },
    { value: 'Dezembro', label: 'Dezembro' },
  ], []);

  const { data: colorTheme } =
    useQuery('colors', fetchThemeColors, { staleTime: 1000 * 60 * 10 })

  const {
    stripeBgColor,
  } = useMemo(() => ({
    stripeBgColor: !!colorTheme ? colorTheme.top_one.value : '#fff',
  }), [colorTheme]);

  return (
    <Container>
      <MenuButton onClick={() => push('/menu')}>
        <Menu />
      </MenuButton>
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
      <InputContainer>
        <Label>Nome e Apelido</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Select
          title="Més de Nascimento"
          customWidth="100%"
          setValue={(value: string) => setMonth(value)}
          data={monthsData}
        />
      </InputContainer>
      <ConfirmationButton onClick={handleSignIn}>
        <ConfirmationButtonText>
          Salvar
        </ConfirmationButtonText>
      </ConfirmationButton>
      <Cback
        style={{
          height: '1.875rem',
          marginTop: 'auto'
        }}  
      />
    </Container>
  );
}
