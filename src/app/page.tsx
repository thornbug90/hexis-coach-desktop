import Sidebar from "hexis/components/common/sidebar";
import Main from "hexis/app/components/main";
import LoggingOutComponent from "hexis/components/common/logging-out";

export default async function Home() {
  return (
    <>
      <LoggingOutComponent />
      <main className="w-full h-screen bg-background-500 flex flex-row justify-between">
        <div className="lg:w-[60px] lg:hover:overflow-visible">
          <Sidebar />
        </div>
        <div className="w-full lg:min-w-5/6 flex flex-col lg:items-end bg-background-500 h-full lg:pr-2">
          <Main />
        </div>
      </main>
    </>
  );
}
