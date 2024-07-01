import { LogoIcon } from "hexis/components/icons/general";

const NoData: React.FC<{ liveGraph?: boolean; title?: string }> = ({ liveGraph, title }) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-center mx-auto max-w-80 mt-10">
        <div className="h-8 w-8 mb-4">
          <LogoIcon />
        </div>
        {title && <p className="text-lg text-gray-200 font-poppins-medium mb-6">{title} unavailable </p>}
        <p className="text-almostWhite text-sm text-center mb-12 font-poppins-medium">
          {liveGraph
            ? "You can only see your live graph for today and past days."
            : `Hexis plans your ${title} up to 7 days in advance. Please check back closer to the date to view your ${title}.`}
        </p>
      </div>
    </div>
  );
};

export default NoData;
