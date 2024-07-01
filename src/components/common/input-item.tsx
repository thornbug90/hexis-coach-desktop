export type IInputItemProps = {
  title?: string | undefined;
  titleComponent?: React.ReactNode;
  value?: string | undefined;
  leftIcon?: any;
  rightIcon?: any;
  checkbox?: boolean;
  width?: number;
  itemCountOnSameLine?: boolean;
  disabled?: boolean;
};

const InputItem = ({
  title = "",
  titleComponent = null,
  value = "",
  leftIcon = null,
  checkbox = false,
  width = 100,
  itemCountOnSameLine = false,
  disabled = true,
}: IInputItemProps) => {
  const LeftIcon = leftIcon;
  const textColor = disabled ? "text-white/50" : "text-white/100";
  return (
    <div
      className={`flex flex-${checkbox ? "row" : "col"} py-3 px-4 items-start justify-center self-stretch rounded-lg bg-background-300 h-16 mr-${itemCountOnSameLine ? "3" : "0"}`}
      style={{
        width: `calc(${width}% -  ${itemCountOnSameLine ? 0.75 : 0}rem)`,
      }}
    >
      {titleComponent && <div>{titleComponent}</div>}
      {!titleComponent && title && <span className="text-activeblue-100 font-medium text-xxs tracking-[1px] capitalize">{title}</span>}
      {LeftIcon ? (
        <div className="flex items-center gap-2 flex-1">
          <LeftIcon color={"#8B8D9E"} width={16} height={16} />
          <input
            className={`${textColor} bg-background-300 font-normal text-base tracking-[0.25px] w-full text-left mt-1 ${title ? "" : "leading-8"}`}
            value={value}
            disabled={disabled}
          />
        </div>
      ) : (
        <input
          className={`${textColor} bg-background-300 font-normal text-base tracking-[0.25px] w-full text-left mt-1 ${title ? "" : "leading-8"}`}
          value={value}
          disabled={disabled}
        />
      )}
      {checkbox && <input type="checkbox" name="fuel_wizard" checked className="w-6 h-6 mt-2" disabled={disabled} />}
    </div>
  );
};

export default InputItem;
