import styled, { css } from 'styled-components';

type CategoryProps = {
  selected: boolean;
  bg: string;
  name: string;
}

type CategoryTitleProps = {
  selected: boolean;
}

export const Category = styled.button<CategoryProps>`
  height: 2.25rem;
  padding: 0 1.25rem;
  border-radius: 1.25rem;
  background-color: ${({ selected, bg }) => (selected ? bg : '#E9EAEE')};
  align-items: center;
  justify-content: center;
  margin-right: 0.625rem;
  display: flex;
  
  .a {
    fill: ${({ selected, name }) => selected && name === 'Todos' ? '#fff' : '#272e47'};
  }

  ${({ selected, name }) =>
    selected && name === 'Sem Açúcar' && css`
      border: 1px solid #272e47;
  `}
`;

export const CategoryTitle = styled.p<CategoryTitleProps>`
  font-size: 0.875rem;
  color: #272E47;
  word-break: keep-all;
  white-space: nowrap;
  margin-left: 0.375rem;
`;