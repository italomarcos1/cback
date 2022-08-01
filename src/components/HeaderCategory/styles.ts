import styled from 'styled-components';

type CategoryProps = {
  selected: boolean;
  colorBase: string;
  colorActive: string;
}

type CategoryTitleProps = {
  selected: boolean;
  colorBase: string;
  colorActive: string;
}

export const Category = styled.button<CategoryProps>`
  height: 2.25rem;
  padding: 0 1.25rem;
  border-radius: 1.25rem;
  background-color:
    ${({ selected, colorBase, colorActive }) =>(selected ? colorActive : colorBase)};
  align-items: center;
  justify-content: center;
  margin-right: 0.625rem;
`;

export const CategoryTitle = styled.p<CategoryTitleProps>`
  font-size: 0.875rem;
  color: ${({ selected, colorBase, colorActive }) => (selected ? colorActive : colorBase)};
  word-break: keep-all;
  white-space: nowrap;
`;