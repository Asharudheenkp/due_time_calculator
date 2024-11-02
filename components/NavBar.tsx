import React from "react";
import { DarkModeToggler } from "./DarkModeToggler";
import Link from "next/link";

const NavBar = () => {
  return (
      <nav className="w-[80%] mx-auto pt-8">
        <div className="flex justify-between items-center">
        <Link href={'/'}> <h1 className="text-5xl animate-spin-slow">⏳</h1></Link>
          <div className="flex items-center gap-3">
            <Link href={'/games'}>Games</Link>
            <DarkModeToggler />
          </div>
        </div>
      </nav>
  );
};

export default NavBar;
