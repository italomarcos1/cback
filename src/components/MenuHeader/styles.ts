import styled from 'styled-components';

type MenuButtonProps = {
  active: boolean;
  color: string;
}

type ColorProps = {
  color: string;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 2;
`;

export const StripeContainer = styled.div<ColorProps>`
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => color};
  position: absolute;
  clip-path: polygon(0 0, 100% 0, 27% 100%, 0 100%);
`;

export const MainHeader = styled.div`
  flex-direction: row;
  align-items: flex-end;
  background-color: #CE4C4F;
  position: relative;
  height: 5.5rem;
  justify-content: space-between;
  width: 100%;
  display: flex;
`;

export const MenuAndTitle = styled.div<ColorProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1;
  padding: 0 1rem 0.75rem;
  width: 90%;

  .a {
    fill: ${({ color }) => color};
  }
`;

export const Title = styled.p<ColorProps>`
  color: ${({ color }) => color};
  font-size: 1.125rem;
  margin-left: 1rem;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  width: 85%;
`;

export const MenuButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1;
  padding: 0 1rem 0.75rem;
`;

export const MenuButton = styled.button<MenuButtonProps>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${({ active }) => active ? '#FFCC78' : 'transparent'};
  border-color: ${({ color, active }) => active ? '#FFCC78' : color};
  border-style: solid;
  /* border-width: 3px; */
  z-index: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  fill: ${({ color }) => color};
  stroke: ${({ color }) => color};
  
  .heartIcon {
    fill: ${({ color }) => color};
  }
  
  .searchIcon {
    stroke: ${({ color }) => color};
  }

  & + button {
    margin-left: 0.5rem;
  }
`;

export const SubHeader = styled.div<ColorProps>`
  width: 100%;
  background-color: ${({ color }) => color};
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  padding: 0.75rem 0 0.625rem;
`;

export const HeaderOptions = styled.div<ColorProps>`
  background-color: ${({ color }) => color};
  width: 100%;
  height: 2.25rem;
  display: flex;
  width: 100%;
  align-items: center;
  overflow-x: scroll;
  padding: 0 0.75rem 0;
`;

export const FavoritesContainer = styled.div<ColorProps>`
  background-color: ${({ color }) => color};
  width: 100%;
  height: 3.5rem;
  display: flex;
  width: 100%;
  align-items: center;
  padding-left: 1rem;
`;

export const FavoritesTitle = styled.p`
  font-size: 1.375rem;
  margin-left: 0.625rem;
  font-weight: bold;
  color: #FD756B;
`;

export const SearchInputContainer = styled.div`
  width: 100%;
  padding: 0 0.75rem 0;
`;

export const SearchInputContent = styled.div`
  background-color: #fff;
  height: 2.25rem;
  padding-left: 1.5rem;
  padding-right: 1.25rem;
  background-color: #E9F2FD;
  border-radius: 1.25rem;
  flex-direction: row;
  align-items: center;
  display: flex;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 1rem;
  font-size: 0.875rem;
  line-height: 0.875rem;
  color: #000;
  padding: 0;
  background-color: #E9F2FD;

  &::placeholder {
    color: #272E47;
  }
`;