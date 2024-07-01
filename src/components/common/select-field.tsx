import React, { FocusEvent, KeyboardEventHandler } from "react";
import { Control, Controller } from "react-hook-form";
import { GroupBase, Options, OptionsOrGroups, StylesConfig } from "react-select";
import CreatableSelect from "react-select/creatable";
import ErrorText from "./error";
import { IErrors } from "./input-field";
import { Accessors } from "react-select/dist/declarations/src/useCreatable";

const colorStyles: StylesConfig = {
  control: () => ({
    backgroundColor: "#30314C",
    borderRadius: "8.91px",
    minHeight: "95px",
    width: "396px",
    color: "#fff",
    padding: "14px 17px",
  }),
  input: () => ({
    color: "#FFF",
    fontSize: "14px",
    width: "100%",
  }),
  //@ts-ignore
  multiValue: (styles, { data }) => ({
    ...styles,
    backgroundColor: "transparent",
    border: "1px solid #359CEF",
    color: "#fff",
    borderRadius: "6px",
    position: "relative",
    height: "32px",
    padding: "10px, 3px",
    margin: "5px 10px 5px 0",
    display: "flex",
  }),
  multiValueLabel: () => ({
    color: "#fff",
    fontWeight: "400",
    padding: "4px 0 4px 12px",
    marginRight: "40px",
    lineHeight: "20px",
    fontSize: "12px",
  }),
  //@ts-ignore
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    backgroundColor: "#359CEF",
    boxShadow:
      "1.36351px 1.95884px 0.960215px rgba(0, 0, 0, 0.02), 0.768172px 1.09465px 0.80658px rgba(0, 0, 0, 0.08), 0.345677px 0.499312px 0.595333px rgba(0, 0, 0, 0.13), 0.0768172px 0.115226px 0.326473px rgba(0, 0, 0, 0.15), 0px 0px 0px rgba(0, 0, 0, 0.15)",
    borderRadius: "3.2973px",
    position: "absolute",
    top: "7px",
    right: "12px",
    padding: "1px",
    fontWeight: "bold",
    fontSize: "12px",
  }),
  menu: () => ({ visibility: "hidden", position: "absolute" }),
  clearIndicator: () => ({ visibility: "hidden" }),
};

export interface ISelectField {
  key?: any;
  id?: string;
  label?: string;
  name: string;
  defaultValue?: any;
  control: Control<any>;
  isMulti?: boolean;
  isSearchable?: boolean;
  rules?: Object;
  errors?: IErrors;
  options?: any[];
  placeholder?: string;
  styles?: any | StylesConfig;
  value?: string;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement> | undefined;
  isValidNewOption?: (
    inputValue: string,
    value: Options<any>,
    options: OptionsOrGroups<any, GroupBase<unknown>>,
    accessors: Accessors<any>,
  ) => boolean;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onClick?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (selected: any) => void;
}

const SelectField = ({
  key,
  id,
  name,
  label,
  defaultValue = [],
  control,
  isMulti = true,
  isSearchable = true,
  rules,
  options,
  placeholder,
  styles,
  value,
  errors,
  onBlur,
  onChange,
  onClick,
  onKeyDown,
  isValidNewOption,
  ...props
}: ISelectField) => {
  return (
    <>
      <Controller
        {...props}
        key={key}
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <CreatableSelect
            isMulti={isMulti}
            isSearchable={isSearchable}
            onBlur={onBlur}
            options={options}
            placeholder={placeholder}
            styles={styles ? styles : colorStyles}
            onChange={onChange}
            isValidNewOption={isValidNewOption}
            onKeyDown={onKeyDown}
            value={value}
            tabSelectsValue={false}
            components={{
              DropdownIndicator: null,
              IndicatorSeparator: null,
            }}
          />
        )}
      />

      <ErrorText error={errors?.[name]?.message} />
    </>
  );
};

export default SelectField;
