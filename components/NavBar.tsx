import React from "react";
import { DarkModeToggler } from "./DarkModeToggler";

const NavBar = () => {
  return (
      <nav className="w-[80%] mx-auto pt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-5xl">⏳</h1>
          <DarkModeToggler />
        </div>
      </nav>
  );
};

export default NavBar;
