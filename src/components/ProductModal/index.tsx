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
      case 'Sem Glúten':
        return <GlutenFree />
      case 'Opção Sem Glúten':
        return <GlutenFree />
      case 'Contém Álcool':
        return <HasAlcohol />
      case 'Opção Contém Álcool':
        return <HasAlcohol />
      default: 
        return <HasAlcohol />
    }
  }, [])

  const labelColor = useCallback((label: string) => {
    switch(label) {
      case 'Todos':
        return '#0173B1';
      case 'Opção Todos':
        return '#0173B1';
      case 'Vegano':
        return '#99F6A8';
      case 'Opção Vegano':
        return '#99F6A8';
      case 'Vegetariano':
        return '#25CFA1';
      case 'Opção Vegetariano':
        return '#25CFA1';
      case 'Sem Açúcar':
        return  '#fff';
      case 'Opção Sem Açúcar':
        return  '#fff';
      case 'Sem Glúten':
        return '#FFCC78';
      case 'Opção Sem Glúten':
        return '#FFCC78';
      case 'Contém Álcool':
        return '#FD786F';
      case 'Opção Contém Álcool':
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
              mainLabel.includes('Opção') ||
              extraLabel.includes('Opção')
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
                    {extraLabel.replace('Opção ', '')}
                    {extraLabel.includes('Opção') &&
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
                  {mainLabel.replace('Opção ', '')}
                  {mainLabel.includes('Opção') &&
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

