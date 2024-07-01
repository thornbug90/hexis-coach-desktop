import React from "react";
import Header from "./components/header";
import AllGroups from "./components/groups";

const Groups = () => {
  return (
    <div className="w-full px-8 lg:px-10 lg:pr-6 md:pr-6 mb-8 min-h-screen h-full">
      <Header />
      <AllGroups />
    </div>
  );
};

export default Groups;
