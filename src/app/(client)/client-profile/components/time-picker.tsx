import React, { useState, useRef, KeyboardEvent, useEffect } from "react";

import "../../client-fuel-plan/components/duration-picker.css";

interface IDurationPicker {
  value: string;
  setValue: (_: string) => void;
  isDisabled: boolean;
  type: string;
  isActivated?: Function;
}

interface IDurationInputItem {
  value: string;
  type?: string;
  id: number;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setFocus: React.Dispatch<React.SetStateAction<number>>;
  hour1?: string;
  isDisabled: boolean;
  isFocused?: boolean;
  tempValue?: string;
  setIsFocused?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DurationInputItem = React.memo(
  React.forwardRef<HTMLInputElement, IDurationInputItem>(
    ({ id, value, hour1, isDisabled, isFocused, tempValue, setValue, setFocus, setIsFocused, type }, ref) => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!!e.key.match(/[0-9]/)) {
          switch (id) {
            case 0:
              if (e.key < "3") {
                setValue(e.key);
                setFocus(prev => (prev === 3 ? 3 : prev + 1));
              }
              break;
            case 1:
              if ((hour1 === "2" && e.key < "4") || hour1 !== "2") {
                setValue(e.key);
                setFocus(prev => (prev === 3 ? 3 : prev + 1));
              }
              break;
            case 2:
              if (e.key < "6") {
                setValue(e.key);
                setFocus(prev => (prev === 3 ? 3 : prev + 1));
              }
              break;
            default:
              setValue(e.key);
              setFocus(prev => (prev === 3 ? 3 : prev + 1));
              break;
          }
        } else if (e.key === "Delete") {
          setValue("0");
        } else if (e.key === "Backspace") {
          setValue("0");
          setFocus(prev => (prev === 0 ? 0 : prev - 1));
        } else if (e.key === "ArrowLeft") {
          setFocus(prev => (prev === 0 ? 0 : prev - 1));
        } else if (e.key === "ArrowRight") {
          setFocus(prev => (prev === 3 ? 3 : prev + 1));
        }
      };
      return (
        <input
          ref={isFocused ? ref : null}
          value={value}
          type="number"
          placeholder={value}
          onKeyDown={handleKeyDown}
          onMouseDown={() => setFocus(id)}
          disabled={isDisabled}
          className={`${(type !== "time" && isDisabled) || tempValue == "00:00" ? "opacity-50" : ""} text-xs font-normal text-white/80 tracking-widest w-2`}
          onFocus={() => setIsFocused && setIsFocused(true)}
          onBlur={() => setIsFocused && setIsFocused(false)}
        />
      );
    },
  ),
);
DurationInputItem.displayName = "DurationInputItem";

const TimePicker = ({ value, setValue, isDisabled = false, type, isActivated }: IDurationPicker) => {
  const [focus, setFocus] = useState(0);
  const [hours, minutes] = value.split(":");
  const [hour1, setHour1] = useState(hours ? hours.padStart(2, "0")[0] : "0");
  const [hour2, setHour2] = useState(hours ? hours.padStart(2, "0")[1] : "0");
  const [minute1, setMinute1] = useState(minutes ? minutes.padStart(2, "0")[0] : "0");
  const [minute2, setMinute2] = useState(minutes ? minutes.padStart(2, "0")[1] : "0");
  const [isFocused, setIsFocused] = useState(false);
  const hour1Ref = useRef<HTMLInputElement>(null);
  const hour2Ref = useRef<HTMLInputElement>(null);
  const minute1Ref = useRef<HTMLInputElement>(null);
  const minute2Ref = useRef<HTMLInputElement>(null);
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    const [hours, minutes] = value.split(":");
    setHour1(hours ? hours.padStart(2, "0")[0] : "0");
    setHour2(hours ? hours.padStart(2, "0")[1] : "0");
    setMinute1(minutes ? minutes.padStart(2, "0")[0] : "0");
    setMinute2(minutes ? minutes.padStart(2, "0")[1] : "0");
  }, [value]);

  useEffect(() => {
    const refArray = [hour1Ref, hour2Ref, minute1Ref, minute2Ref];
    refArray.forEach(item => item.current?.blur());
    refArray[focus].current?.focus();
  }, [focus]);

  useEffect(() => {
    if (![hour1, hour2, minute1, minute2].every(time => time === "0") && !isDisabled) {
      isActivated?.(true);
    } else {
      isActivated?.(false);
    }
    setTempValue(`${hour1}${hour2}:${minute1}${minute2}`);
  }, [hour1, hour2, minute1, minute2, value]);

  useEffect(() => {
    if (!isFocused) {
      setValue(tempValue);
    }
  }, [isFocused]);
  return (
    <div className="flex">
      <DurationInputItem
        isDisabled={isDisabled}
        value={hour1}
        setValue={setHour1}
        ref={hour1Ref}
        setFocus={setFocus}
        id={0}
        setIsFocused={setIsFocused}
        tempValue={tempValue}
        isFocused={isFocused}
        type={type}
      />
      <DurationInputItem
        isDisabled={isDisabled}
        value={hour2}
        setValue={setHour2}
        ref={hour2Ref}
        setFocus={setFocus}
        id={1}
        hour1={hour1}
        setIsFocused={setIsFocused}
        tempValue={tempValue}
        isFocused={isFocused}
        type={type}
      />
      <span className={`${(isDisabled && type !== "time") || tempValue == "00:00" ? "opacity-50" : ""} text-xs text-white/80 mx-[1px]`}>
        :
      </span>
      <DurationInputItem
        isDisabled={isDisabled}
        value={minute1}
        setValue={setMinute1}
        ref={minute1Ref}
        setFocus={setFocus}
        id={2}
        setIsFocused={setIsFocused}
        tempValue={tempValue}
        isFocused={isFocused}
        type={type}
      />
      <DurationInputItem
        isDisabled={isDisabled}
        value={minute2}
        setValue={setMinute2}
        ref={minute2Ref}
        setFocus={setFocus}
        id={3}
        setIsFocused={setIsFocused}
        tempValue={tempValue}
        isFocused={isFocused}
        type={type}
      />
    </div>
  );
};
TimePicker.displayName = "TimePicker";
export default React.memo(TimePicker);
