import { api } from "~/services/api";
import { ColorTheme, ICategory, IClient, IProduct } from "../../types/general";

type IProductsById = {
  [key: number]: IProduct[];
}

type FetchAllProductsResponse = {
  categories: ICategory[];
  products: IProductsById;
  allProducts: IProduct[];
}

export async function fetchCategories(): Promise<ICategory[]> {
  try{
    const {
      data: {
        data: { data: categories
        }
      }
    } = await api.get('/categories');

    return categories;
  } catch (e) {
    console.log('e', e);
    return [];
  }
}

export async function fetchFavorites(): Promise<IProduct[]> {
  try{
    const {
      data: {
        data: { data: favorites
        }
      }
    } = await api.get('/wishlists');

    return favorites;
  } catch (e) {
    console.log('e', e);
    return [];
  }
}

export async function fetchAllProducts(): Promise<FetchAllProductsResponse> {
  try{
    let productsById = {};
    let allProducts: IProduct[] = [];

    const {
      data: {
        data: { data: categories
        }
      }
    } = await api.get('/categories');

    // @ts-ignore
    await Promise.all(categories.map(async (c) => {
      const {
        data: {
          data: { data: products }
        }
      } = await api.get(`/categories/${c.id}/products`)
      
      // @ts-ignore
      productsById[c.id] = products;

      allProducts = [...allProducts, ...products]
    }));

    const filteredAllProducts = allProducts.filter(p => !!p.labels)

    return {
      categories,
      products: productsById,
      allProducts: filteredAllProducts
    };
  } catch (e) {
    console.log('e', e);
    return {
      categories: [],
      products: {},
      allProducts: []
    }
  }
}

export async function fetchClient(): Promise<IClient> {
  try{
    const {
      data: {
        data: client
      }
    } = await api.get('/clients');

    return client;
  } catch (e) {
    console.log('e', e);
    return null as unknown as IClient;
  }
}

export async function fetchThemeColors(): Promise<ColorTheme> {
  try{
    const {
      data: {
        data: colors
      }
    } = await api.get('/configurations');

    return colors;
  } catch (e) {
    console.log('e', e);
    return null as unknown as ColorTheme;
  }
}