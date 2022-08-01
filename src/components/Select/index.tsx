// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import chroma from "chroma-js";

import Select, { components } from "react-select";

import { Title, Menu, DropdownImage } from "./styles";

// @ts-ignore
import { ReactComponent as DropdownIcon } from "../../assets/dropdown.svg";
import { DefaultValueProps } from "../../types/general";

export const colourOptions = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "forest", label: "Forest" },
  { value: "slate", label: "Slate" },
  { value: "silver", label: "Silver" },
];

const Placeholder = (props) => {
  return <components.Placeholder {...props} />;
};

// const MenuList = ({ selectProps, children, ...rest }) => {
//   const { customWidth } = selectProps;
//   return (
//     <components.MenuList {...rest}>
//       <Menu style={{ width: customWidth - 8 }} onClick={() => {}}>
//         <span>
//           <img src={addItem} alt="addItem" />
//           Add new
//         </span>
//       </Menu>
//       {children}
//     </components.MenuList>
//   );
// };

const DropdownIndicator = ({ selectProps, ...rest }) => {
  return (
    <components.DropdownIndicator {...rest}>
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  width: '0.9rem', height: '2rem' }}
      >
      <DropdownIcon />
      </div>
    </components.DropdownIndicator>
  );
};

const SelectContainer = ({ children, selectProps, ...props }) => {
  const { title } = selectProps;
  
  return (
    <components.SelectContainer {...props}>
      <Title>
        {title}
      </Title>
      {children}
    </components.SelectContainer>
  );
};

interface CustomSelectProps {
  title: string;
  placeholder?: string;
  defaultValue?: DefaultValueProps;
  setValue: Function;
  customWidth?: string | number;
  fontSize?: number;
  data?: DefaultValueProps[];
  disabled?: boolean;
  error?: boolean;
  style?: object;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  title,
  setValue,
  placeholder = 'Selecione...',
  data = [],
  fontSize = 12,
  defaultValue = {},
  customWidth = 221,
  disabled = false,
  error = false,
  style,
}) => {
  const [isValidated, setIsValidated] = useState('');

  useEffect(() => {
    if(isValidated !== '') return;
    setIsValidated(!!defaultValue.value);
  }, [defaultValue, isValidated])

  return (
    <Select
      title={title}
      placeholder={placeholder}
      components={{
        SelectContainer,
        Placeholder,
        IndicatorSeparator: () => <></>,
        DropdownIndicator,
      }}
      isDisabled={disabled}
      onChange={({ value, id }) => {
        setIsValidated(!!value);
        setValue(value, id);
      }}
      options={data}
      // options={!!data.length ? data : colourOptions}
      // options={colourOptions}
      customWidth={customWidth}
      defaultValue={defaultValue}
      fontSize={fontSize}
      styles={{
        control: (
          styles,
          { isFocused, selectProps: { menuIsOpen } }
        ) => ({
          ...styles,
          backgroundColor: disabled ? "#F4F5F8" : "#fff",
          borderColor: isValidated || menuIsOpen ? "#8FE7D0" : "#DBDFEB",
          borderRadius: '0.5rem',
          borderStyle: "solid",
          borderWidth: isFocused ? 0.25 : 1,
          color: "#2b2b2b",
          fontSize: '1.125rem',
          maxHeight: '3rem',
          minHeight: '3rem',
          height: '3rem',
          padding: 0,
          // paddingLeft: '0.625rem',
          fontFamily: "Lato",
          width: customWidth,
          "&:hover": {
            borderWidth: isFocused ? 0.5 : 1,
          },
        }),
        placeholder: (base) => ({
          ...base,
          fontSize: '1.125rem',
          fontStyle: "italic",
          lineHeight: '1rem',
          fontFamily: "Lato",
          letterSpacing: 0,
          color: "#BBBFC6",
          padding: 0,
          paddingLeft: 2,
          margin: 0,
        }),
        container: (base) => ({
          ...base,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '5rem',
          padding: 0,
          width: customWidth,
          fontSize: '1.125rem',
          ...style,
        }),
        dropdownIndicator: (base, { isFocused }) => ({
          ...base,
          backgroundColor: '#fff',
          borderTopRightRadius: '0.5rem',
          borderBottomRightRadius: '0.5rem',
          height: '2.875rem',
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#fff",
          marginTop: -2.5,
          borderRadius: 0,
          width: customWidth,
          zIndex: 1099,
        }),
        menuList: (base) => ({
          ...base,
          borderRadius: 0,
          width: customWidth,
          overflowX: 'hidden',
          zIndex: 1099,
        }),
        option: (styles, { isDisabled, isFocused, isSelected }) => {
          const color = chroma("#8FE7D0");
          return {
            ...styles,
            fontSize: '1.125rem',
            backgroundColor: isDisabled
              ? null
              : isSelected
              ? "#8FE7D0"
              : isFocused
              ? "#f4f5f8"
              : null,
            color: isSelected ? "#fff" : isFocused ? "#8FE7D0" : "#2b2b2b",
            width: customWidth,
            marginLeft: 4,
            marginTop: 4,
            zIndex: 1099,

            ":active": {
              ...styles[":active"],
              backgroundColor:
                !isDisabled && (isSelected ? color : color.alpha(0.3).css()),
            },
          };
        },
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 4,
        borderWidth: 0.5,
        colors: {
          ...theme.colors,
          primary25: "#8FE7D0",
          primary: "#8FE7D0",
        },
      })}
    />
  );
};
