import React, { useState, useRef, KeyboardEvent, useEffect } from "react";

import "./duration-picker.css";

interface IDurationPicker {
  value: string;
  setValue: (_: string) => void;
  isDisabled: boolean;
}

interface IDurationInputItem {
  value: string;
  id: number;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setFocus: React.Dispatch<React.SetStateAction<number>>;
  hour1?: string;
  isDisabled: boolean;
}

const DurationInputItem = React.forwardRef<HTMLInputElement, IDurationInputItem>(
  ({ value, id, setValue, setFocus, hour1, isDisabled }, ref) => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!!e.key.match(/[0-9]/)) {
        switch (id) {
          case 0:
            if (e.key < "3") {
              setValue(e.key);
              setFocus(prev => (prev === 5 ? 5 : prev + 1));
            }
            break;
          case 1:
            if ((hour1 === "2" && e.key < "4") || hour1 !== "2") {
              setValue(e.key);
              setFocus(prev => (prev === 5 ? 5 : prev + 1));
            }
            break;
          case 2:
            if (e.key < "6") {
              setValue(e.key);
              setFocus(prev => (prev === 5 ? 5 : prev + 1));
            }
            break;
          case 4:
            if (e.key < "6") {
              setValue(e.key);
              setFocus(prev => (prev === 5 ? 5 : prev + 1));
            }
            break;
          default:
            setValue(e.key);
            setFocus(prev => (prev === 5 ? 5 : prev + 1));
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
        setFocus(prev => (prev === 5 ? 5 : prev + 1));
      }
    };
    return (
      <input
        ref={ref}
        value={value}
        type="number"
        onKeyDown={handleKeyDown}
        onMouseDown={() => setFocus(id)}
        disabled={isDisabled}
        className={isDisabled ? "opacity-50" : ""}
      />
    );
  },
);
DurationInputItem.displayName = "DurationInputItem";

const DurationPicker = ({ value, setValue, isDisabled = false }: IDurationPicker) => {
  const [focus, setFocus] = useState(0);
  const [hours, minutes, seconds] = value.split(":");
  const [hour1, setHour1] = useState(hours.padStart(2, "0")[0]);
  const [hour2, setHour2] = useState(hours.padStart(2, "0")[1]);
  const [minute1, setMinute1] = useState(minutes.padStart(2, "0")[0]);
  const [minute2, setMinute2] = useState(minutes.padStart(2, "0")[1]);
  const [second1, setSecond1] = useState(seconds.padStart(2, "0")[0]);
  const [second2, setSecond2] = useState(seconds.padStart(2, "0")[1]);

  const hour1Ref = useRef<HTMLInputElement>(null);
  const hour2Ref = useRef<HTMLInputElement>(null);
  const minute1Ref = useRef<HTMLInputElement>(null);
  const minute2Ref = useRef<HTMLInputElement>(null);
  const second1Ref = useRef<HTMLInputElement>(null);
  const second2Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const [hours, minutes, seconds] = value.split(":");
    setHour1(hours.padStart(2, "0")[0]);
    setHour2(hours.padStart(2, "0")[1]);
    setMinute1(minutes.padStart(2, "0")[0]);
    setMinute2(minutes.padStart(2, "0")[1]);
    setSecond1(seconds.padStart(2, "0")[0]);
    setSecond2(seconds.padStart(2, "0")[1]);
  }, [value]);

  useEffect(() => {
    const refArray = [hour1Ref, hour2Ref, minute1Ref, minute2Ref, second1Ref, second2Ref];
    refArray.forEach(item => item.current?.blur());
    refArray[focus].current?.focus();
  }, [focus]);

  useEffect(() => {
    if (hour1 !== "0" || hour2 !== "0" || minute1 !== "0" || minute2 !== "0" || second1 !== "0" || second2 !== "0") {
      setValue(`${hour1}${hour2}:${minute1}${minute2}:${second1}${second2}`);
    }
  }, [hour1, hour2, minute1, minute2, second1, second2, value]);

  return (
    <div className="flex">
      <DurationInputItem isDisabled={isDisabled} value={hour1} setValue={setHour1} ref={hour1Ref} setFocus={setFocus} id={0} />
      <DurationInputItem
        isDisabled={isDisabled}
        value={hour2}
        setValue={setHour2}
        ref={hour2Ref}
        setFocus={setFocus}
        id={1}
        hour1={hour1}
      />

      <span className={`mx-1 ${isDisabled ? "opacity-50" : ""}`}>:</span>

      <DurationInputItem isDisabled={isDisabled} value={minute1} setValue={setMinute1} ref={minute1Ref} setFocus={setFocus} id={2} />
      <DurationInputItem isDisabled={isDisabled} value={minute2} setValue={setMinute2} ref={minute2Ref} setFocus={setFocus} id={3} />

      <span className={`mx-1 ${isDisabled ? "opacity-50" : ""}`}>:</span>

      <DurationInputItem isDisabled={isDisabled} value={second1} setValue={setSecond1} ref={second1Ref} setFocus={setFocus} id={4} />
      <DurationInputItem isDisabled={isDisabled} value={second2} setValue={setSecond2} ref={second2Ref} setFocus={setFocus} id={5} />
    </div>
  );
};
DurationPicker.displayName = "DurationPicker";
export default React.memo(DurationPicker);
