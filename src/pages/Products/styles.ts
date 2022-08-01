import styled, { keyframes } from 'styled-components';

type ColorProps = {
  color: string;
}

export const Container = styled.div<ColorProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => color};
`;

export const ProductsContainer = styled.div<ColorProps>`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 47%);
  padding: 0 0.5rem 6rem;
  background-color: ${({ color }) => color};
  gap: 1.25rem 1rem;
  justify-content: center;
`;

export const CategoryTitleContainer = styled.div`
  margin-top: 1.25rem;
  margin-left: 0.5rem;
  grid-column: 1/3;
`;

export const CategoryTitle = styled.p<ColorProps>`
  font-weight: bold;
  font-size: 1.375rem;
  line-height: 1.375rem;
  color: ${({ color }) => color};
`;

export const NoProductsFound = styled.p`
  font-size: 1.25rem;
  line-height: 1.375rem;
  margin-top: 2rem;
  color: #666;
  text-align: center;
  grid-column: 1/3;
`;

const rotate = keyframes` /** widtwidtwidth: 840px;h: 840px;h: 840px;animação para rotacionar o icon. */
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const LoadingContainer = styled.div`
  svg {
    animation: ${rotate} 2s linear infinite;
  }
  display: flex;
  justify-content: center;
  padding-top: 4rem;

  grid-column: 1/3;
`;