import React, { useCallback, useMemo, useState } from 'react';

// @ts-ignore
import { ReactComponent as CloseIcon } from '../../assets/close_white.svg';
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
// @ts-ignore
import { ReactComponent as FavoriteIcon } from '../../assets/favoritos.svg';
// @ts-ignore
import { ReactComponent as FavoriteActiveIcon } from '../../assets/favoritos_active.svg';
// @ts-ignore
import { ReactComponent as LoadingIcon } from '../../assets/loading_white.svg';


import {
  Container,
  PictureContainer,
  Picture,
  CloseButton,
  Description,
  Options,
  Badge,
  OptionalBadge,
  BadgeContainer,
  LoadingButton,
  Background
} from './styles';
import { useApp } from '../../context/app';
import { IProduct } from '../../types/general';
import { api } from '~/services/api';

export function ProductModal() {
  const {
    currentProduct,
    setCurrentProduct,
    favorites,
    setFavorites
  } = useApp();

  const [isAdding, setIsAdding] = useState(false);

  const isFavorite = useMemo(() => 
    !!currentProduct && favorites.find(({ id })=> id === currentProduct.id)
  , [currentProduct, favorites]);

  const handleAddFavorite = useCallback(async () => {
    
    try {
      if (!currentProduct) return;
      setIsAdding(true);
      await api.post('/wishlists', { // @ts-ignore
        product_id: currentProduct!.id
      })

      // @ts-ignore
      setFavorites(prev => [...prev, currentProduct])
    } catch (e) {
      console.log('e', e);
    } finally {
      setIsAdding(false);
    }
  }, [currentProduct, setFavorites]);

  const handleRemoveFavorite = useCallback(async () => {
    try {
      if (!currentProduct) return;  
      setIsAdding(true); 
      
      // @ts-ignore
      await api.delete(`/wishlists/${currentProduct!.id}`)

      // @ts-ignore
      setFavorites(prev => prev.filter(f => f.id !== currentProduct.id))
    } catch (e) {
      console.log('e', e);
    } finally {
      setIsAdding(false);
    }
  }, [currentProduct, setFavorites]);

  const labelIcon = useCallback((label: string) => {
    switch(label) {
      case 'Todos':
        return <AllIcon />
      case 'Op????o Todos':
        return <AllIcon />
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
  }, [])

  const labelColor = useCallback((label: string) => {
    switch(label) {
      case 'Todos':
        return '#0173B1';
      case 'Op????o Todos':
        return '#0173B1';
      case 'Vegano':
        return '#99F6A8';
      case 'Op????o Vegano':
        return '#99F6A8';
      case 'Vegetariano':
        return '#25CFA1';
      case 'Op????o Vegetariano':
        return '#25CFA1';
      case 'Sem A????car':
        return  '#fff';
      case 'Op????o Sem A????car':
        return  '#fff';
      case 'Sem Gl??ten':
        return '#FFCC78';
      case 'Op????o Sem Gl??ten':
        return '#FFCC78';
      case 'Cont??m ??lcool':
        return '#FD786F';
      case 'Op????o Cont??m ??lcool':
        return '#FD786F';
      default: 
        return '#000';
    }
  }, []);

  const { mainLabel, extraLabel } = useMemo(() => {
    if(!currentProduct) 
      return { mainLabel: '', extraLabel: '' };

    if (!currentProduct.labels)
      return { mainLabel: '', extraLabel: '' };
    
    const [mainLabel, extraLabel] = currentProduct.labels.split(", ");

    return {
      mainLabel,
      extraLabel: !!extraLabel ? extraLabel : ''
    };
  }, [currentProduct]);

  return !!currentProduct ? (
    <Background
      onClick={() => setCurrentProduct(null as unknown as IProduct)}
    >
      <Container
      // @ts-ignore
        onClick={(e) => e.stopPropagation()}
      >
        <PictureContainer>
          <Picture
            src={currentProduct.gallery[0].image.JPG}
          />
          <CloseButton
            onClick={() => setCurrentProduct(null as unknown as IProduct)}
          >
            <CloseIcon style={{ color: '#fff' }}/>
          </CloseButton>
        </PictureContainer>
        <Description>
          <strong>{currentProduct.name}</strong>
          <p>{currentProduct.description}</p>
          <Options
            hasExtraLabel={!!extraLabel}
            hasOptional={
              mainLabel.includes('Op????o') ||
              extraLabel.includes('Op????o')
            }
          >
            {!!currentProduct.labels &&
              <BadgeContainer>
                {!!extraLabel &&
                  <Badge
                    bg={labelColor(extraLabel)}
                    name={extraLabel}
                    style={{
                      marginBottom: '1.25rem',
                      alignSelf: 'flex-start'
                    }}
                  >
                    {labelIcon(extraLabel)}
                    {extraLabel.replace('Op????o ', '')}
                    {extraLabel.includes('Op????o') &&
                      <OptionalBadge>
                        Opcional
                      </OptionalBadge>
                    }
                  </Badge>
                }
                <Badge
                  bg={labelColor(mainLabel)}
                  name={mainLabel}
                >
                  {labelIcon(mainLabel)}
                  {mainLabel.replace('Op????o ', '')}
                  {mainLabel.includes('Op????o') &&
                    <OptionalBadge>
                      Opcional
                    </OptionalBadge>
                  }
                </Badge>
              </BadgeContainer>
            }
            {isAdding ?
              <LoadingButton>
                <LoadingIcon />
              </LoadingButton>
            : isFavorite ?
              <FavoriteActiveIcon
                onClick={handleRemoveFavorite}
                style={{
                  width: '2.325rem',
                  height: '2.325rem'
                }}
              /> :
              <FavoriteIcon
                onClick={handleAddFavorite}
                style={{
                  width: '2.325rem',
                  height: '2.325rem'
                }}
              />
            }
            <p>{currentProduct.price} &euro;</p>
          </Options>
        </Description>
      </Container>
    </Background>
  ) :
  <></>;
}

