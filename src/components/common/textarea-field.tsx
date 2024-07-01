import React, { FormEvent, FocusEvent, KeyboardEvent } from "react";
import { Control, Controller } from "react-hook-form";
import { IErrors } from "./input-field";
import ErrorText from "./error";

export interface ITextArea {
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
  onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({
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
  className,
  type,
  autoComplete = "off",
  placeholder,
  onValueChange,
  rows,
  onBlur,
  onKeyDown = () => {},
  ...inputProps
}: ITextArea) => {
  return (
    <Controller
      name={name}
      control={control}
      key={key}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, name } }) => (
        <>
          <textarea
            {...inputProps}
            onChange={(event: FormEvent<any>) => {
              onChange(event);
              onValueChange && onValueChange(event, onChange);
            }}
            autoComplete={autoComplete}
            placeholder={placeholder}
            value={value}
            name={name}
            // rows={rows || 2}
            cols={7}
            style={{ minHeight: "20px", minWidth: "50%", ...inputStyle }}
            className={className}
            disabled={disabled}
            onKeyDown={onKeyDown}
          />
          {errors && showError && <ErrorText error={(errors as IErrors)?.[name]?.message || errors} />}
        </>
      )}
    />
  );
};

export default TextArea;
