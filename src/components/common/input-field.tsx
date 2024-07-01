import React, { FormEvent, FocusEvent, KeyboardEvent, MouseEventHandler } from "react";
import { Control, Controller } from "react-hook-form";
import ErrorText from "hexis/components/common/error";
import clsx from "clsx";

export interface IErrors {
  [key: string]: any;
}

export interface IInputField {
  key?: any;
  id?: string;
  name: string;
  component?: any;
  control: Control<any>;
  defaultValue?: any;
  showError?: boolean;
  disabled?: boolean;
  rules?: Object;
  onFocus?: () => void;
  errors?: IErrors | string;
  value?: string;
  inputStyle?: React.CSSProperties;
  className?: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  onValueChange?: (event: FormEvent<any>, onChange?: (...event: any[]) => void) => void;
  rows?: number;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onMouseDown?: MouseEventHandler<HTMLInputElement>;
  overrideClassName?: boolean;
}

export const InputField = ({
  key,
  id,
  name,
  defaultValue = "",
  value,
  component: Component,
  control,
  showError = true,
  disabled = false,
  rules,
  onFocus,
  errors,
  inputStyle,
  className = "mt-4 mb-3 w-full p-3 rounded-lg bg-background-300 outline-0 text-white",
  type,
  autoComplete = "off",
  placeholder,
  onValueChange,
  rows,
  onBlur,
  onKeyDown,
  onMouseDown,
  overrideClassName,
  ...inputProps
}: IInputField) => {
  const inputClassname = clsx(className, {
    "rounded-lg bg-background-300 outline-0 text-white": !overrideClassName,
  });
  return (
    <Controller
      name={name}
      control={control}
      key={key}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, name } }) => (
        <>
          <input
            {...inputProps}
            onChange={(event: FormEvent<any>) => {
              onChange(event);
              onValueChange && onValueChange(event, onChange);
            }}
            onBlur={onBlur}
            autoComplete={autoComplete}
            placeholder={placeholder}
            value={value}
            name={name}
            type={type}
            style={{ minHeight: "40px", minWidth: "50%", ...inputStyle }}
            className={inputClassname}
            disabled={disabled}
            onKeyDown={onKeyDown}
            onMouseDown={onMouseDown}
          />
          {errors && showError && <ErrorText error={(errors as IErrors)?.[name]?.message || errors} />}
        </>
      )}
    />
  );
};
