import clsx from "clsx";
import ModernIntensityIcon from "hexis/components/icons/general/ModernIntensityIcon";
import VectorIcon from "hexis/components/icons/general/VectorIcon";
import { intensityMapping } from "hexis/lib/intensity";
import React from "react";
import ReactSlider from "react-slider";
interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const IntensityScaleModal: React.FC<Props> = ({ show, setShow }) => {
  return (
    show && (
      <div
        className="z-50 fixed w-full h-full bg-black/80 flex justify-center items-center overflow-y-scroll"
        onClick={() => setShow(false)}
      >
        <div className="inline-flex flex-col items-center">
          <div
            className="relative flex w-24 h-24 justify-center items-start gap-2.5 rounded-full bg-activeblue-100 border-4 border-background-800"
            style={{ transform: "translateY(50%)" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-[15%]">
              <ModernIntensityIcon height={34.7} />
            </div>
            <div
              className="absolute"
              style={{
                top: "44%",
                left: "44%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <VectorIcon />
            </div>
          </div>
          <div
            className="w-[340px] flex self-stretch pt-16 pb-6 px-6 flex-col justify-center items-center gap-6 rounded-2xl bg-background-900"
            onClick={e => e.stopPropagation()}
          >
            <span className="text-center text-lightgrey1-600 font-medium text-[24px] tracking-[0.25px]">Our Intensity Scale</span>
            <span className="text-center text-lightgrey1-600 font-normal text-base tracking-[0.25px]">
              Use the slider and its descriptors to identify the intensity of your workout
            </span>
            <div className="flex justify-center self-stretch my-8">
              <ReactSlider
                className="h-[400px] w-[160px]"
                orientation="vertical"
                min={0}
                max={100}
                value={67}
                marks={Object.keys(intensityMapping).map(key => 100 - Number(key))}
                renderMark={({ key }) => {
                  return (
                    <span
                      className={`text-lightgrey1-600 text-sm left-0 font-light transform -translate-y-1/2 absolute tracking-[0.25px]`}
                      style={{ top: `${key}%`, left: "40px" }}
                      contentEditable={false}
                    >
                      {intensityMapping[(100 - Number(key)) as keyof typeof intensityMapping]}
                    </span>
                  );
                }}
                pearling
                renderTrack={(props, state) => (
                  <div
                    {...props}
                    contentEditable={undefined}
                    className={clsx(`w-3 rounded-lg`, {
                      "bg-lightgrey2-700": state.index === 0,
                      "bg-activeblue-100": state.index === 1,
                    })}
                    style={{
                      transform: "translate(-50%)",
                      ...props.style,
                    }}
                  />
                )}
                renderThumb={props => (
                  <div
                    {...props}
                    contentEditable={undefined}
                    className="w-8 h-8 shrink-0 rounded-full bg-white shadow-[0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 1px 3px 0px rgba(16, 24, 40, 0.20)]"
                    style={{
                      transform: "translateX(-50%)",
                      ...props.style,
                    }}
                  ></div>
                )}
                disabled
              />
            </div>

            <button
              onClick={() => setShow(false)}
              className="flex self-stretch py-3 px-6 justify-center items-center gap-2.5 flex-1 text-sm rounded-[10px] font-normal bg-activeblue-100 tracking-[0.7px] shadow-[0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 1px 3px 0px rgba(16, 24, 40, 0.20)] hover:bg-activeblue-100/70"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default IntensityScaleModal;
