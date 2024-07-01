import { montserrat } from "../../app/fonts";
import React from "react";
import WarningCircleIcon from "../icons/general/WarningCircleIcon";

interface IProps {
  error: any;
  html?: boolean;
  className?: string;
}

const ErrorText = ({ error, html = false, className }: IProps) => {
  function createMarkup() {
    return { __html: error };
  }

  const markup = createMarkup();

  return (
    <div className={`flex items-start ${className ?? ""}`}>
      {error && <WarningCircleIcon width={16} height={16} className="mt-0.5" />}
      <div key={error} className={`my-0 text-xs py-0 mb-2 ml-2 ${montserrat.className} `}>
        <p className="h-auto">
          {html ? (
            <span className="text-carbcodelow-100">
              <div dangerouslySetInnerHTML={markup} />
            </span>
          ) : (
            <span className="inline-block text-carbcodelow-100 text-sm">{error}</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ErrorText;
