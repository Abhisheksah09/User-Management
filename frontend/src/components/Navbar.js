import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function Navbar() {
  const [toggle, setToggle] = useState("false");
  const { isLoggedIn, LogoutUser } = useAuth();

  return (
    <div className="bg-gray-400 p-1">
      <div className="max-w-[1240px] py-[17px] item-center  flex justify-between k mx-auto">
        <div className="text-3xl font-bold">My Logo</div>

        {toggle ? (
          <AiOutlineMenu
            onClick={() => setToggle(!toggle)}
            className="text-black text-2xl md:hidden block"
          />
        ) : (
          <AiOutlineClose
            onClick={() => setToggle(!toggle)}
            className="text-black text-2xl md:hidden block"
          />
        )}

        <ul className="hidden md:flex items-center px-10  gap-10 text-[18px]">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/about">About</NavLink>
          </li>

          {/* <li>
            <NavLink to="/profile">Profile</NavLink>
          </li> */}

          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>

          {/* <input className="border border-2px px-5 mx-[-] rounded-2xl " placeholder="Search" /> */}
        </ul>

        <ul className="flex items-center justify-between mt-2 space-x-4 ">
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/profile"
                  className="cursor-pointer  hidden md:inline bg-black text-white p-2 mx-1 md:px-8 md:py-[4px] rounded-full 
                   "
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="cursor-pointer  hidden md:inline bg-black text-white p-2 mx-1 md:px-8 md:py-[4px] rounded-full   "
                  onClick={() => {
                    LogoutUser();
                  }}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="cursor-pointer  hidden md:inline bg-black text-white p-2  md:px-8 md:py-[5px] rounded-full "
              >
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* className="  cursor-pointer  hidden md:inline bg-black text-white p-2 mx-1 md:px-8 md:py-[4px] rounded-full" */}

        {/* Responsive */}

        <ul
          className={`md:hidden w-full h-screen fixed  top-[102px] text-white bg-black
                ${toggle ? "left-[0]" : "left-[-100%]"}
          `}
        >
          <li className=" p-6 ">
            <NavLink to="/">Home</NavLink>
          </li>

          <li className="   p-6 ">
            <NavLink to="/about">About</NavLink>
          </li>

          <li className="    p-6">
            <NavLink to="/profile">Profile</NavLink>
          </li>

          <li className="   p-6">
            <NavLink to="/contant">Contact</NavLink>
          </li>

          <button className=" bg-white text-black px-5 py-1 m-5 rounded-full ">
            Login
          </button>
        </ul>
      </div>
    </div>
  );
}
