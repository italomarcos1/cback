import React, { useCallback, ButtonHTMLAttributes } from 'react';

// @ts-ignore
import { ReactComponent as AllIcon } from '../../assets/all.svg';
// @ts-ignore
import { ReactComponent as AllWhiteIcon } from '../../assets/all_white.svg';
// @ts-ignore
import { ReactComponent as GlutenFree } from '../../assets/gluten_free.svg';
// @ts-ignore
import { ReactComponent as HasAlcohol } from '../../assets/has_alcohol.svg';
// @ts-ignore
import { ReactComponent as SugarFree } from '../../assets/sugar_free.svg';
// @ts-ignore
import { ReactComponent as Vegan } from '../../assets/vegan.svg';
// @ts-ignore
import { ReactComponent as Vegetarian } from '../../assets/vegetarian.svg';

import { Category, CategoryTitle } from './styles';

type Item = {
  id: string | number;
  name: string;
  color?: string;
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  item: Item;
  active: boolean;
  bg: string;
}

export function FilterHeaderCategory({
  item,
  active,
  bg,
  ...rest
}: Props) {
  const labelIcon = useCallback((label: string) => {
    switch(label) {
      case 'Todos':
        return <AllIcon />
      case 'Opção Todos':
        return <AllIcon />
      case 'Vegano':
        return <Vegan />
      case 'Opção Vegano':
        return <Vegan />
      case 'Vegetariano':
        return <Vegetarian />
      case 'Opção Vegetariano':
        return <Vegetarian />
      case 'Sem Açúcar':
        return <SugarFree />
      case 'Opção Sem Açúcar':
        return <SugarFree />
      case 'Contém Alcool':
        return <HasAlcohol />
      case 'Opção Contém Alcool':
        return <HasAlcohol />
      default: 
        return <HasAlcohol />
    }
  }, [])

  return (
    <Category
      key={item.id}
      selected={active}
      bg={bg}
      name={item.name}
      {...rest}
    >
      {labelIcon(item.name)}
      <CategoryTitle
        selected={active}
        style={{ color: active && item.name === 'Todos' ? '#fff' : '#272e47' }}
      >
        {item.name}
      </CategoryTitle>
    </Category>
  );
}
