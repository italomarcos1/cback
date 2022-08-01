import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

// @ts-ignore
import { ReactComponent as Menu } from '../../assets/menu.svg';
// @ts-ignore
import { ReactComponent as FavoritesIcon } from '../../assets/heart.svg';
// @ts-ignore
import { ReactComponent as FavoritesActiveIcon } from '../../assets/favoritos_active.svg';
// @ts-ignore
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
// @ts-ignore
import { ReactComponent as SearchBlueIcon } from '../../assets/search_blue.svg';
// @ts-ignore
import { ReactComponent as MenuIcon } from '../../assets/menu_icon.svg';
import { ICategory } from '../../types/general';
import { HeaderCategory } from '../HeaderCategory';
import { FilterHeaderCategory } from '../FilterHeaderCategory';

import {
  Container,
  MainHeader,
  MenuAndTitle,
  Title,
  MenuButtonContainer,
  MenuButton,
  SubHeader,
  HeaderOptions,
  SearchInputContainer,
  SearchInput,
  FavoritesContainer,
  FavoritesTitle,
  SearchInputContent,
  StripeContainer
} from './styles';
import { useApp } from '../../context/app';
import { fetchThemeColors } from '../../app/requests/general';
import { useQuery } from 'react-query';

type Props = {
  title: string;
  categories: ICategory[];
  filterOptions: string[];
  stripeColor?: string | null;
  bgColor?: string | null;
  active: string;
  setActive: (value: string) => void;
  searchMode: boolean;
  setSearchMode: (value: boolean) => void;
  handleFilterOptions: (value: string) => void;
  favoritesMode: boolean;
  setFavoritesMode: (value: boolean) => void;
  scrollToCategory: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  handleSearch: () => void;
}

export function Header({
  title,
  categories,
  filterOptions,
  handleFilterOptions,
  scrollToCategory,
  active,
  setActive,
  favoritesMode,
  setFavoritesMode,
  stripeColor = null,
  bgColor = null,
  search,
  setSearch,
  handleSearch,
  searchMode,
  setSearchMode
}: Props) {  
  const { push } = useHistory();
  // const { colorTheme } = useApp();
  const { data: colorTheme } =
    useQuery('colors', fetchThemeColors, { staleTime: 1000 * 60 * 10 })

  const {
    stripeBgColor,
    backgroundColor,
    menuBgColor,
    variationsBgColor,
    fontColor,
    iconsColor
  } = useMemo(() => ({
    stripeBgColor: !!colorTheme ? colorTheme.top_one.value : '#fff',
    backgroundColor: !!colorTheme ? colorTheme.top_two.value : '#333',
    menuBgColor: !!colorTheme ? colorTheme.menu_bg.value : '#fff',
    variationsBgColor: !!colorTheme ? colorTheme.variations_bg.value : '#fff',
    fontColor: !!colorTheme ? colorTheme.top_text.value : '#fff',
    iconsColor: !!colorTheme ? colorTheme.top_icons.value : '#fff',
  }), [colorTheme]);

  const categoryFilterOptions = useMemo(() => [
    { id: 1, name: 'Todos', color: '#0173B1', },
    { id: 2, name: 'Vegano', color: '#99F6A8', },
    { id: 3, name: 'Vegetariano', color: '#25CFA1', },
    { id: 4, name: 'Sem Açúcar', color: '#FFF', },
    { id: 5, name: 'Sem Glúten', color: '#FFCC78', },
    { id: 6, name: 'Contém Álcool', color: '#FD786F', },
  ], []);

  const handleScroll = useCallback((id: string) => {
    try {
      // const top = document.getElementById(id)?.offsetLeft;
      const container = document.getElementById('categoriesHeader');
      const element = document.getElementById(id)?.offsetLeft;

      // @ts-ignore
      // top.scrollLeft = 200;
      
      // @ts-ignore
      container.scroll({ left: element - 10, behavior: 'smooth' });
    } catch (e) {
      console.log('e', e)
    }
  }, []);

  const enterKeyOptions = useMemo(
    () => ["Enter", "NumpadEnter", "enter", "numpadenter"],
    []
  );
  
  return (
    <Container>
      <MainHeader style={{ backgroundColor }}>
        <StripeContainer
          color={stripeBgColor}
        />
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
        <MenuButtonContainer>
          <MenuButton
            onClick={() => {
              // @ts-ignore
              setFavoritesMode(f => !f);
              setSearchMode(false);
            }}
            active={favoritesMode}
            color={iconsColor}
          >
            {favoritesMode ?
              <MenuIcon
            /> :
            <FavoritesIcon
              width="0.875rem"
              height="0.875rem"
            />}
          </MenuButton>
          <MenuButton
            onClick={() => {
              // @ts-ignore
              setSearchMode(s => !s);
              setFavoritesMode(false);
            }}
            active={searchMode}
            color={iconsColor}
          >
            {searchMode ?
              <MenuIcon /> :
              <SearchIcon
                width="0.875rem"
                height="0.875rem"
              />
            }
          </MenuButton>
        </MenuButtonContainer>
      </MainHeader>
      {favoritesMode ?
        <FavoritesContainer
          color={menuBgColor}
        >
          <FavoritesActiveIcon
            width="2.125rem"
            height="2.125rem"
          />
          <FavoritesTitle>
            Favoritos
          </FavoritesTitle>
        </FavoritesContainer> :
        <SubHeader
          color={menuBgColor}
        >
          {searchMode ? 
            <SearchInputContainer>
              <SearchInputContent>
                <SearchInput
                  placeholder="Busque aqui"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={({ code }) => enterKeyOptions.includes(code) && handleSearch()}
                />
              <SearchBlueIcon
                onClick={handleSearch}
              />
              </SearchInputContent>
            </SearchInputContainer>
          :
          !!categories.length &&
            <HeaderOptions
              id="categoriesHeader"
              color={menuBgColor}  
            >
              {categories.map((c) =>
                <HeaderCategory
                  id={`c${c.id}`}
                  item={c}
                  active={active === c.name}
                  onClick={() => {
                    setActive(c.name);
                    scrollToCategory(`category${c.id}`);
                    handleScroll(`c${c.id}`)
                  }}
                />
              )}
            </HeaderOptions>
          }
          {!favoritesMode &&
            <HeaderOptions
              style={{
                marginTop: !!categories.length || searchMode ? '1.25rem' : '0'
              }}
              color={variationsBgColor}  
            >
              {categoryFilterOptions.map((c) =>
                <FilterHeaderCategory
                  item={c}
                  active={filterOptions.includes(c.name)}
                  onClick={() => handleFilterOptions(c.name)}
                  bg={c.color}
                />
              )}
            </HeaderOptions>
          }
        </SubHeader>
        }
    </Container>
  );
}
