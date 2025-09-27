import React, { useState } from "react";
import { Search, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  function handleMenu() {
    setOpenMenu(!openMenu);
  }
  return (
    <div className="px-6 py-6 bg-[#EFEFEF]">
      <header>
        <nav className="relative flex justify-between md:px-28 w-full">
          <div className="flex justify-between items-center w-full text-2xl font-semibold">
            <Link to="/">
              <p className="text-[#1C1C1C]">
                RISE<span className="text-[#7851E9]">BLOG</span>
              </p>
            </Link>
            <Menu onClick={handleMenu} className="block md:hidden" />
          </div>
          <ul
            className={
              openMenu
                ? "flex flex-col justify-center items-center space-x-6 bg-white w-[300px] absolute right-6 top-8 space-y-4 p-10 rounded-lg shadow-lg border border-gray-200"
                : "hidden md:flex md:gap-8"
            }
          >
            {/* Home */}
            <Link to="/">
              <li className="text-xl md:text-base font-medium text-[#1C1C1C] border-gray-300 hover:border-[#7851E9] pb-1 transition-colors duration-200 md:border-0">
                Home
              </li>
            </Link>
            {/* Posts */}
            <Link to="/posts">
            <li className="text-xl md:text-base font-medium text-[#1C1C1C] border-gray-300 hover:border-[#7851E9] pb-1 transition-colors duration-200 md:border-0">

                Posts
              </li>
            </Link>
            {/* Write */}
            <Link to="/post-editor">
            <li className="text-xl md:text-base font-medium text-[#1C1C1C] border-gray-300 hover:border-[#7851E9] pb-1 transition-colors duration-200 md:border-0">

                Write
              </li>
            </Link>
            {/* Search */}
            <li>
              <Search className="hover:text-[#7851E9]" />
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
