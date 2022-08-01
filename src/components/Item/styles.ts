import styled from 'styled-components';
import { rotate } from '../LoadingContainer/styles';

type OptionProps = {
  bg: string;
}

export const Container = styled.div`
  width: 100%;
  height: 16rem;
  background-color: #fff;
  border-radius: 0.5rem;
`;

export const Picture = styled.img`
  width: 100%;
  height: 7.1875rem;
  border-radius: 0.5rem;
  object-fit: cover;
`;

export const Info = styled.div`
  /* height: 100%; */
  width: 100%;
  flex: 1;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  padding: 0.625rem 0.5rem;
`;

export const Title = styled.p`
  font-size: 1rem;
  line-height: 1.125rem;
  font-weight: bold;
  color: #272E47;
  height: 2.25rem;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const Description = styled(Title)`
  font-weight: normal;
  color: #838484;
  margin-top: 0.375rem;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 0.875rem;
`;

export const Options = styled.div`
  flex-direction: row;
  margin-top: auto;
  width: 100%;
  height: 2rem;
  align-items: center;
  display: flex;
  margin-top: 0.5rem;
`;

export const OptionsContainer = styled.div`
  width: 50%;
  flex-direction: row;
  display: flex;
`;

export const Option = styled.button<OptionProps>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${({ bg }) => bg};
  align-items: center;
  justify-content: center;
  margin-right: 0.375rem;
  position: relative;
`;

export const OptionBadge = styled.button`
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-style: solid;
  border-width: 1px;
  border-color: #272E47;
  top: -0.3125rem;
  right: -0.3125rem;
  z-index: 1;
`;

export const LoadingButton = styled(Option)`
  min-width: 2rem;
  min-height: 2rem;
  
  > svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

export const Favorite = styled(Option)`
  background-color: #D3D5D7;

  .favoriteIcon {
    .b {
      fill: #b7b7b7;
    }
  }
`;

export const Price = styled.p`
  font-size: 1.125rem;
  line-height: 1.0625rem;
  font-weight: bold;
  color: #333;
  margin-left: auto;
`;