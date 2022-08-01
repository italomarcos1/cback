import styled, { css } from "styled-components";

interface IndicatorProps {
  isFocused: boolean;
}

interface TitleProps {
  disabled: boolean;
}

export const Title = styled.p<TitleProps>`
  font-family: "Lato";
  font-size: 1.125rem;
  color: #F7F7F7;
  height: 1.375rem;
  line-height: 1.375rem;
`;

export const DropdownImage = styled.img``;

export const Menu = styled.button.attrs({
  type: "button",
})`
  padding: 2px 8px;
  background-color: #f4f5f8;
  color: #424242;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 32px;
  width: 213px;
  margin-left: 4px;

  font-size: 12px;
  line-height: 16px;
  font-family: "Lato";
  letter-spacing: 0px;

  span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  img {
    margin-right: 10px;
  }
`;
