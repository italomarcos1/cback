import React, { useCallback, useMemo, useState } from 'react';

// @ts-ignore
import { ReactComponent as FavoriteIcon } from '../../assets/favoritos.svg';
// @ts-ignore
import { ReactComponent as FavoriteActiveIcon } from '../../assets/favoritos_active.svg';
// @ts-ignore
import { ReactComponent as PlusIcon } from '../../assets/plus.svg';
// @ts-ignore
import { ReactComponent as GlutenFree } from '../../assets/gluten_free_white.svg';
// @ts-ignore
import { ReactComponent as HasAlcohol } from '../../assets/has_alcohol_white.svg';
// @ts-ignore
import { ReactComponent as SugarFree } from '../../assets/sugar_free_white.svg';
// @ts-ignore
import { ReactComponent as Vegan } from '../../assets/vegan_white.svg';
// @ts-ignore
import { ReactComponent as Vegetarian } from '../../assets/vegetarian_white.svg';
// @ts-ignore
import { ReactComponent as LoadingIcon } from '../../assets/loading_white.svg';

import { IProduct } from '../../types/general';

import {
  Container,
  Picture,
  Info,
  Title,
  Description,
  Options,
  OptionsContainer,
  Option,
  Favorite,
  Price,
  OptionBadge,
  LoadingButton
 } from './styles';
import { useApp } from '../../context/app';
import { api } from '~/services/api';

type Props = {
  item: IProduct;
}

export function Item({ item }: Props) {
  const { favorites, setFavorites, setCurrentProduct } = useApp();

  const [isAdding, setIsAdding] = useState(false);

  const isFavorite = useMemo(() => 
    favorites.find(f => f.id === item.id)
  , [item, favorites]);

  const handleAddFavorite = useCallback(async () => {
    try {
      setIsAdding(true);
      await api.post('/wishlists', {
        product_id: item.id
      })

      // @ts-ignore
      setFavorites(prev => [...prev, item])
    } catch (e) {
      console.log('e', e);
    } finally {
      setIsAdding(false);
    }
  }, [item, setFavorites]);

  const handleRemoveFavorite = useCallback(async () => {
    try {
      setIsAdding(true);
      await api.delete(`/wishlists/${item.id}`)

      // @ts-ignore
      setFavorites(prev => prev.filter(f => f.id !== item.id))
    } catch (e) {
      console.log('e', e);
    } finally {
      setIsAdding(false);
    }
  }, [item, setFavorites]);

  const labelColor = useMemo(() => ({
    'Todos': '#0173B1',
    'Op????o Todos': '#0173B1',
    'Vegano': '#99F6A8',
    'Op????o Vegano': '#99F6A8',
    'Vegetariano': '#25CFA1',
    'Op????o Vegetariano': '#25CFA1',
    'Sem A????car': '#FFF',
    'Op????o Sem A????car': '#FFF',
    'Sem Gl??ten': '#FFCC78',
    'Op????o Sem Gl??ten': '#FFCC78',
    'Cont??m ??lcool': '#FD786F',
    'Op????o Cont??m ??lcool': '#FD786F',
  }), [])

  const labelIcon = useCallback((label: string) => {
    switch(label) {
      case 'Vegano':
        return <Vegan />
      case 'Op????o Vegano':
        return <Vegan />
      case 'Vegetariano':
        return <Vegetarian />
      case 'Op????o Vegetariano':
        return <Vegetarian />
      case 'Sem A????car':
        return <SugarFree />
      case 'Op????o Sem A????car':
        return <SugarFree />
      case 'Sem Gl??ten':
        return <GlutenFree />
      case 'Op????o Sem Gl??ten':
        return <GlutenFree />
      case 'Cont??m ??lcool':
        return <HasAlcohol />
      case 'Op????o Cont??m ??lcool':
        return <HasAlcohol />
      default: 
        return <HasAlcohol />
    }
  }, []);

  const { mainLabel } = useMemo(() => {
    if (!item.labels)
      return { mainLabel: '' };
    
    const [mainLabel, ...rest] = item.labels.split(", ");

    return {
      mainLabel
    };
  }, [item]);

  if(item.name === 'Cowboy Ribeye')
    console.log(item)

  return (
    <Container>
      <Picture
        src={item.gallery[0].image.JPG}
        onClick={() => setCurrentProduct(item)}
      />
      <Info>
        <Title
          onClick={() => setCurrentProduct(item)}
        >
          {item.name}
        </Title>
        <Description
          onClick={() => setCurrentProduct(item)}
        >
          {item.description}
        </Description>
        <Options>
          <OptionsContainer>
            {!!item.labels && 
              // @ts-ignore 
              <Option bg={labelColor[mainLabel]}>
                {mainLabel.includes('Op????o') &&
                  <OptionBadge>
                    <PlusIcon
                      style={{
                        width: '0.625rem',
                        height: '0.625rem'
                      }}
                    />
                  </OptionBadge>
                }
                {labelIcon(mainLabel)}
              </Option>
            }
            {isAdding ?
              <LoadingButton bg="#D3D5D7">
                <LoadingIcon /> 
              </LoadingButton> :
              <Favorite bg="#D3D5D7">
                {isFavorite ?
                  <FavoriteActiveIcon
                    onClick={handleRemoveFavorite}
                    style={{
                      width: '2rem',
                      height: '2rem'
                    }}
                  /> :
                  <FavoriteIcon
                    onClick={handleAddFavorite}
                    style={{
                      width: '2rem',
                      height: '2rem'
                    }}
                  />
                }
            </Favorite>
            }
          </OptionsContainer>
          <Price>
            {item.price} &euro;
          </Price>
        </Options>
      </Info>
    </Container>
  );
}

