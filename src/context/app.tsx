import React, { ReactNode, createContext, useCallback, useContext, useState, useMemo } from 'react';
import { ColorTheme, IProduct } from '../types/general';

type User = {
  name: string;
  month: string;
}

type AppContextData = {
  user: User;
  setUser: (user: User) => void;
  signed: boolean;
  setSigned: (value: boolean) => void;
  handleSignOut: () => void;
  currentProduct: IProduct;
  setCurrentProduct: (product: IProduct) => void;
  favorites: IProduct[];
  setFavorites: (favorites: IProduct[]) => void;
  colorTheme: ColorTheme;
}

type AppContextProps = {
  children: ReactNode;
}

const AppContext = createContext({} as AppContextData);

export function AppProvider({ children }: AppContextProps) {
  const [user, setUser] = useState<User>(null as unknown as User);
  const [signed, setSigned] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<IProduct>(null as unknown as IProduct);
  const [favorites, setFavorites] = useState<IProduct[]>([]);

  const [colorTheme, setColorTheme] =
    useState(null as unknown as ColorTheme);

  const handleSignOut = useCallback(() => {
    setUser(null as unknown as User);
    setSigned(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        signed,
        setSigned,
        handleSignOut,
        currentProduct,
        setCurrentProduct,
        favorites,
        setFavorites,
        colorTheme
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext);

  return context;
}