import React from "react";
import { Icon, useColorMode } from "@chakra-ui/react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import styles from "./styles.module.css";
import Link from "next/link";
import { AutoConnect } from "../connectWalletButton";
import { XusdLogo } from "../../assets";
import Image from "next/image";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4 bg-gray-800">
        <nav
          className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <Link
              className="flex items-center text-xl font-semibold  dark:text-gray-800"
              href="/"
            >
              <Image src={XusdLogo} alt="XUD" width={50} />{" "}
              <h3 className="text-white pl-3  dark:text-white">XUSD</h3>
            </Link>
            <div className="sm:hidden">
              <button
                type="button"
                className={`       ${styles.navToggle}         hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-gray dark:focus:ring-offset-gray-800`}
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden w-4 h-4"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden w-4 h-4"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
              <Link
                className="font-medium text-white text-xl"
                href="/swap"
                aria-current="page"
              >
                Swap
              </Link>
              <Link
                className="font-medium text-white text-xl hover:text-gray-500 dark:text-gray-500 dark:hover:text-white"
                href="/marketplace"
              >
                Tokens
              </Link>
              <Link
                className="font-medium text-white text-xl hover:text-gray-500 dark:text-gray-500 dark:hover:text-white"
                href="#"
              >
                NFTs
              </Link>
              <Link
                className="font-medium text-white text-xl hover:text-gray-500 dark:text-gray-500 dark:hover:text-white"
                href="#"
              >
                Profile
              </Link>{" "}
              <AutoConnect />{" "}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
