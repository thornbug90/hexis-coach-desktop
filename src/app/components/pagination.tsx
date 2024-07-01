import { ChevronLeft, ChevronRight } from "@components/icons/general";

export default function Pagination() {
  return (
    <div className="flex w-full justify-center my-6">
      <div className="flex gap-3 items-center">
        <button>
          <ChevronLeft />
        </button>
        <button className="px-2.5 py-0.5 rounded-md bg-activeblue-100">1</button>
        <button>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
