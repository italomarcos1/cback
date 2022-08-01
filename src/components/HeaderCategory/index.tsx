import React, { ButtonHTMLAttributes, useMemo } from 'react';
import { useQuery } from 'react-query';
import { fetchThemeColors } from '../../app/requests/general';
import { useApp } from '../../context/app';

import { Category, CategoryTitle } from './styles';

type Item = {
  id: string | number;
  name: string;
  color?: string;
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  item: Item;
  active: boolean;
}

export function HeaderCategory({
  item,
  active,
  ...rest
}: Props) {
  // const { colorTheme } = useApp();

  const { data: colorTheme } =
    useQuery('colors', fetchThemeColors, { staleTime: 1000 * 60 * 10 })

  const {
    textColorActive,
    bgColorActive,
    textColorBase,
    bgColorBase,
  } = useMemo(() => ({
    textColorActive: !!colorTheme ? colorTheme.menu_button_text.value : '#fff',
    bgColorActive: !!colorTheme ? colorTheme.menu_button_bg.value : '#333',
    textColorBase: !!colorTheme ? colorTheme.menu_button_text_disabled.value : '#333',
    bgColorBase: !!colorTheme ? colorTheme.menu_button_bg_disabled.value : '#ccc',
  }), [colorTheme]);

  return (
    <Category
      key={item.id}
      selected={active}
      {...rest}
      colorBase={bgColorBase}
      colorActive={bgColorActive}
    >
      <CategoryTitle
        selected={active}
        colorBase={textColorBase}
        colorActive={textColorActive}
      >
        {item.name}
      </CategoryTitle>
    </Category>
  );
}
