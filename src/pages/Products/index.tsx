import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { useScrollYPosition } from 'react-use-scroll-position';

import { Header } from '../../components/MenuHeader';
import { Item } from '../../components/Item';

// @ts-ignore
import { ReactComponent as LoadingIcon } from '../../assets/loading_products.svg';

import { fetchAllProducts, fetchCategories, fetchClient, fetchFavorites } from '../../app/requests/general';
import { CategoryKey, FinalOffSetPair, ICategory, IProduct, OffSetPair, TempOffsetPair } from '../../types/general';
import { CategoryTitle, CategoryTitleContainer, Container, LoadingContainer, NoProductsFound, ProductsContainer } from './styles';
import { HeaderOptions, SubHeader } from '../../components/MenuHeader/styles';
import { FilterHeaderCategory } from '../../components/FilterHeaderCategory';
import { useApp } from '../../context/app';
import { api } from '~/services/api';
import { isNotEmpty } from '../../utils/validations';

type Params = {
  id: number;
}

export function Products() {
  const { data: productsData, isLoading: productsLoading, refetch } = useQuery('products', fetchAllProducts, { staleTime: 1000 * 60 * 10 });
  const { data: favoritesData, isLoading: favoritesLoading } = useQuery('favorites', fetchFavorites, { staleTime: 1000 * 60 * 10 });
  const { data: client } = useQuery('client', fetchClient, { staleTime: 1000 * 60 * 10 })

  const { state } = useLocation<Params>();
  const [search, setSearch] = useState('');
  const [searchMode, setSearchMode] = useState(false);
  const [hasSearch, setHasSearch] = useState(false);
  const [filterMode, setFilterMode] = useState(false);
  
  const [disabledScroll, setDisabledScroll] = useState(false);

  const scrollY = useScrollYPosition();
  const { colorTheme, favorites, setFavorites } = useApp();

  const [loading, setLoading] = useState(true);

  const [baseProducts, setBaseProducts] = useState<(ICategory | IProduct)[]>([]);
  const [currentProducts, setCurrentProducts] = useState<(ICategory | IProduct)[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<(ICategory | IProduct)[]>([]);
  const [searchProducts, setSearchProducts] = useState<(ICategory | IProduct)[]>([]);
  
  const [categories, setCategories] = useState<ICategory[]>([]);

  const [offsetPairs, setOffsetPairs] = useState<OffSetPair>({} as OffSetPair);
  const [lastOffsetPair, setLastOffsetPair] = useState<OffSetPair>({} as OffSetPair);

  const [active, setActive] = useState('Starters & Shareables');
  const [favoritesMode, setFavoritesMode] = useState(false);
  
  const [filterOptions, setFilterOptions] = useState<string[]>(['Todos']);

  const {
    backgroundColor,
    titleColor,
    menuBgColor,
    variationsBgColor
  } = useMemo(() => ({
    backgroundColor: !!colorTheme ? colorTheme.app_bg.value : '#f3f3f3',
    titleColor: !!colorTheme ? colorTheme.categories.value : '#333',
    menuBgColor: !!colorTheme ? colorTheme.menu_bg.value : '#fff',
    variationsBgColor: !!colorTheme ? colorTheme.variations_bg.value : '#fff',
  }), [colorTheme]);

  const categoryFilterOptions = useMemo(() => [
    { id: 1, name: 'Todos', color: '#0173B1', },
    { id: 2, name: 'Vegano', color: '#99F6A8', },
    { id: 3, name: 'Vegetariano', color: '#25CFA1', },
    { id: 4, name: 'Sem Açúcar', color: '#FFF', },
    { id: 5, name: 'Sem Glúten', color: '#FFCC78', },
    { id: 6, name: 'Contém Álcool', color: '#FD786F', },
  ], []);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      if(!!currentProducts.length) return;
      // @ts-ignore
      const { products, categories } = productsData;

      // @ts-ignore
      let tempProducts = [];

      // @ts-ignore
      categories.forEach((c) => {        
        let header = {
          id: `category${c.id}`,
          name: c.name,
          categoryId: c.id,
          notProduct: true
        };

        let empty = {
          notProduct: true,
          title: ''
        }

        const categoryProducts = [header, ...products[c.id]];

        if (products[c.id].length % 2 !== 0)// @ts-ignore
          categoryProducts.push(empty);

          // @ts-ignore
          tempProducts = [...tempProducts, ...categoryProducts]
        });
        

      // salvar no context, jogar no state
      // no useEffect de load, conferir se foi passado routeId.
      // -- se sim, não faz o loadProducts
      // -- se não, normal
      // conferir caso em que o primeiro clique seja já na categoria.
      // @ts-ignore
      setCurrentProducts(tempProducts);
      // @ts-ignore
      setBaseProducts(tempProducts);
      setCategories(categories);
      setLoading(false);
      if (!!state) {
        setDisabledScroll(true);
        setTimeout(() => handleJumpToProductInfo(String(`category${state.id}`)), 200)
      }
    } catch (err) {
      console.log('e', err);
    }
  }, [currentProducts, productsData, state]);

  const handleJumpToProductInfo = useCallback((id: string) => {
    try {
      setDisabledScroll(true);
      const top = document.getElementById(id)?.offsetTop;

      // @ts-ignore
      // window.scrollTo({ top: top - 36 - (11 * 16), behavior: 'smooth' });
      window.scrollTo({ top: top - 32 - (11 * 16), behavior: 'smooth' });
    } catch (e) {
      console.log('e', e)
    } finally {
      setTimeout(() => setDisabledScroll(false), 600);
    }
  }, []);

  const handleFilterOptions = useCallback((value: string) => {
    console.log('values', value)

    const onlyFilterOptions =
      filterOptions.filter(c => c !== 'Todos');

    const shouldReset = 
      onlyFilterOptions.length === 1 && onlyFilterOptions.includes(value);

    if(value === 'Todos' || shouldReset) {
      setFilterMode(false);
      setFilterOptions(['Todos']);
      setFilteredProducts([]);

      // @ts-ignore
      setCategories(!!productsData ? productsData.categories : []);
      return;
    }
    
    const tempFilterOptions = onlyFilterOptions.includes(value) ?
      onlyFilterOptions.filter(f => f !== value) : [...onlyFilterOptions, value];

    // @ts-ignore
    const { allProducts, categories } = productsData;

    const currentProducts = isNotEmpty(search) ? searchProducts : allProducts;
    
    // @ts-ignore
    const tempFilteredProducts =
      currentProducts.filter((p: IProduct) => tempFilterOptions.includes(p.labels));
    
    // @ts-ignore
    let tempCategoriesKeys: CategoryKey = {};

    categories.forEach((c: ICategory) => 
      tempCategoriesKeys[c.id] = []
    )

    tempFilteredProducts.forEach((p: IProduct) => {
      tempCategoriesKeys[p.category_id] = [...tempCategoriesKeys[p.category_id], p]; 
    });

    const tempCategoriesKeysWithProducts =
      Object.fromEntries(Object.entries(tempCategoriesKeys).filter(e => !!e[1].length));
    
    const currentCategories = categories.filter((e: ICategory) => !!tempCategoriesKeys[e.id].length);

    // @ts-ignore
    let tempProducts = [];

    currentCategories.forEach((c: ICategory) => {        
      let header = {
        id: `category${c.id}`,
        name: c.name,
        categoryId: c.id,
        notProduct: true
      };

      let empty = {
        notProduct: true,
        title: ''
      }

      const currentProducts = tempCategoriesKeysWithProducts[c.id];

      const categoryProducts = [header, ...currentProducts];

      if (currentProducts.length % 2 !== 0) // @ts-ignore
        categoryProducts.push(empty);

        // @ts-ignore
        tempProducts = [...tempProducts, ...categoryProducts];
    });

    console.log('on filter', currentCategories.length)
    
    setFilterMode(true);
    // @ts-ignore
    setFilteredProducts(!!currentCategories.length ? tempProducts : []);
    setFilterOptions(tempFilterOptions);
    setCategories(currentCategories);
  }, [search, searchProducts, productsData, filterOptions]);

  const loadFilteredProducts = useCallback((products: IProduct[]) => {
    // @ts-ignore
    const { categories } = productsData;
    console.log("products favorites", products);
        
    // @ts-ignore
    let tempCategoriesKeys: CategoryKey = {};

    categories.forEach((c: ICategory) => 
      tempCategoriesKeys[c.id] = []
    )

    products!.forEach((p: IProduct) => {
      tempCategoriesKeys[p.category_id] = [...tempCategoriesKeys[p.category_id], p]; 
    });

    const tempCategoriesKeysWithProducts =
      Object.fromEntries(Object.entries(tempCategoriesKeys).filter(e => !!e[1].length));
    
    const currentCategories = categories.filter((e: ICategory) => !!tempCategoriesKeys[e.id].length);

    // @ts-ignore
    let tempProducts = [];

    currentCategories.forEach((c: ICategory) => {        
      let header = {
        id: `category${c.id}`,
        name: c.name,
        categoryId: c.id,
        notProduct: true
      };

      let empty = {
        notProduct: true,
        title: ''
      }

      const currentProducts = tempCategoriesKeysWithProducts[c.id];

      const categoryProducts = [header, ...currentProducts];

      if (currentProducts.length % 2 !== 0) // @ts-ignore
        categoryProducts.push(empty);

        // @ts-ignore
        tempProducts = [...tempProducts, ...categoryProducts];
    });
    // @ts-ignore
    setFilteredProducts(tempProducts);
    setCategories(currentCategories);
  }, [productsData]);

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);

      const {
        data: {
          data: { data: results }
        }
      } = await api.get('/products/search', {
          params: {
            'search': search
          }
        })

      console.log("results", results);
      setSearchProducts(results);
      loadFilteredProducts(results);
      setHasSearch(true);

    } catch (e) {
      console.log('e', e);
    } finally {
      setLoading(false);
    }
  }, [search, loadFilteredProducts]);
    
  const handleScroll = useCallback(({ value, name }: OffSetPair) => {
    try {
      if (disabledScroll) return;
      const container = document.getElementById('categoriesHeader');
      
      let currentPos = 0;
      let currentName = '';
      
      if(!name && !value) {
        currentPos = lastOffsetPair.value;
        currentName = lastOffsetPair.name;
      }
      else {
        currentPos = value - 10;
        currentName = name;
      }

      container!.scroll({ left: currentPos, behavior: 'smooth' });
      setActive(currentName);
    } catch (e) {
      console.log('e', e)
    }
  }, [lastOffsetPair, disabledScroll]);

  useEffect(() => {
    if(!productsLoading && !currentProducts.length) {
      !productsData ? refetch() : loadProducts();
    }
  }, [productsData, currentProducts, productsLoading, refetch]);

  useEffect(() => {
    if(!!currentProducts.length && !loading) {
      let tempOffsetPairs: FinalOffSetPair = {};
      let tempOffsetArr: TempOffsetPair[] = [];
      let finalOffsetArr: OffSetPair[] = [];

      categories.forEach(c => {
        const categoryOffset = document.getElementById(`category${c.id}`)?.offsetTop
        const value = document.getElementById(`c${c.id}`)?.offsetLeft
        
        const position = (Math.floor(categoryOffset!/100));
        tempOffsetArr.push({ position, value: value!, name: c.name});
      })

      setLastOffsetPair(tempOffsetArr[tempOffsetArr.length-1])

      // pegar o último valor
      // se o scroll for um valor inexistente e igual ou maior que esse offset, habilita
      
      for (let i = 0; i <= tempOffsetArr.length - 2; ++i) {
        const { position, value, name } = tempOffsetArr[i];
        const { position: next } = tempOffsetArr[i+1];

        finalOffsetArr = [...finalOffsetArr, ...Array(next - position).fill({ value, name })]
      }

      finalOffsetArr.forEach((f, index) => tempOffsetPairs[index] = f)
      // @ts-ignore
      setOffsetPairs(tempOffsetPairs);
    }
  }, [loading, categories, currentProducts]);

  useEffect(() => {
    if(!!Object.values(offsetPairs).length) {
      const reducedScrollY = Math.floor(scrollY/100);
      // @ts-ignore
      handleScroll({ ...offsetPairs[reducedScrollY] })
    }
  }, [offsetPairs, scrollY]);

  useEffect(() => {
    if (favoritesMode)
      loadFilteredProducts(favorites);
    else {
      setCurrentProducts(baseProducts);
      setFilteredProducts([]); // @ts-ignore
      setCategories(!!productsData ? productsData.categories : []);
    }
  }, [loadFilteredProducts, favorites, baseProducts, productsData, favoritesMode]);

  useEffect(() => {
    if(!favoritesLoading && !!favoritesData)
      setFavorites(favoritesData)
  }, [setFavorites, favoritesLoading, favoritesData])

  useEffect(() => {
    if(!searchMode) {
      setSearch('');
      setHasSearch(false);
      setSearchProducts([]);
      setCurrentProducts(baseProducts);
      setFilteredProducts([]); // @ts-ignore
      setCategories(!!productsData ? productsData.categories : []);
    }
  }, [baseProducts, productsData, searchMode])

  console.log('favoritesData', favoritesData)

  return (
    <>
      <Header
        title={!!client ? client.name : 'CBACK'}
        categories={categories}
        scrollToCategory={(id) => {
          setDisabledScroll(true);
          setTimeout(() => handleJumpToProductInfo(id), 600)
        }}
        active={active}
        setActive={setActive}
        favoritesMode={favoritesMode}
        setFavoritesMode={setFavoritesMode}
        handleFilterOptions={handleFilterOptions}
        filterOptions={filterOptions}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
      />
      <Container
        color={backgroundColor}
        style={{
          paddingTop: favoritesMode ? '8.875rem' : '12.875rem'
        }}
      >
        <ProductsContainer
          color={backgroundColor}
        >
          {loading ?
            <LoadingContainer>
              <LoadingIcon width="2rem" height="2rem" />
            </LoadingContainer>
            :
            hasSearch && !searchProducts.length ?
            <NoProductsFound>
              Nenhum produto encontrado.
            </NoProductsFound>
          :
            hasSearch || filterMode || favoritesMode ? /* @ts-ignore */
              !!filteredProducts.length ?
              filteredProducts.map((f) =>
                f.notProduct ? (
                  <CategoryTitleContainer key={f.id} id={String(f.id)}>
                    <CategoryTitle color={titleColor}>
                      {f.name}
                    </CategoryTitle>
                  </CategoryTitleContainer>
                ) :
                (/* @ts-ignore */
                  <Item key={f.id} item={f} />
                )) :
                <NoProductsFound>
                  Nenhum produto encontrado.
                </NoProductsFound>
            :
            !loading &&
              currentProducts.map((c) =>
                c.notProduct ? (
                  <CategoryTitleContainer key={c.id} id={String(c.id)}
                  >
                    <CategoryTitle color={titleColor}>
                      {c.name}
                    </CategoryTitle>
                  </CategoryTitleContainer>
                ) :
                (/* @ts-ignore */
                  <Item key={c.id} item={c} />
                )
            )}
        </ProductsContainer>
      </Container>
    </>
  );
}
