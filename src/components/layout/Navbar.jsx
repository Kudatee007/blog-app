import React, { useState } from "react";
import { Search, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import smileyWoman from "../../assets/smiley-woman.svg";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  function handleMenu() {
    setOpenMenu(!openMenu);
  }
  return (
    <div className="px-6 py-4 bg-[#EFEFEF] h-[100vh]">
      <header>
        <nav className="relative flex justify-between md:px-28 w-full">
          {/* App title */}
          {/* <Link to="/" className="text-2xl font-bold"> */}
          <div className="flex justify-between items-center w-full text-2xl font-semibold">
            <p className="text-[#1C1C1C]">
              RISE<span className="text-[#7851E9]">BLOG</span>
            </p>
            <Menu onClick={handleMenu} className="block md:hidden" />
          </div>
          {/* </Link> */}

          {/* Navigation Links */}
          <ul
            className={
              openMenu
                ? "flex flex-col justify-center items-center space-x-6 bg-white border border-[#5954EA] w-[250px] absolute right-4"
                : "hidden md:flex md:gap-8"
            }
          >
            {/* <Link to="/home"> */}
            <li className="text-base font-medium text-[#1C1C1C] hover:text-[#7851E9]">
              Home
            </li>
            {/* </Link> */}
            {/* <Link to="/articles"> */}
            <li className="text-base font-medium text-[#1C1C1C] hover:text-[#7851E9]">
              Articles
            </li>
            {/* </Link> */}
            {/* <Link to="about"> */}
            <li className="text-base font-medium text-[#1C1C1C] hover:text-[#7851E9]">
              About
            </li>
            {/* </Link> */}
            {/* <Link to="contact"> */}
            <li className="text-base font-medium text-[#1C1C1C] hover:text-[#7851E9]">
              Contact
            </li>
            {/* </Link> */}
            <li>
              <Search className="hover:text-[#7851E9]" />
            </li>
          </ul>
        </nav>
      </header>

      {/* hero section */}
      <section className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-0 h-[90vh]">
        <img
          src={smileyWoman}
          alt=""
          className="w-full max-w-[400px] lg:max-w-[600px] object-contain"
        />
        <div className="text-right space-y-4">
          <h1 className="text-[65px] xl:text-[105px] leading-none font-semibold text-[#1C1C1C]">
            Write Your <br /> <span className="text-[#7851E9]">Article</span>
            <br /> here
          </h1>
          <button className="bg-[#3652E1] w-[150px] md:w-[200px] py-3 text-[#EFEFEF] rounded-full font-meduim">
            Write
          </button>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
