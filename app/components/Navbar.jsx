"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import vercel from "../../public/vercel.svg";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const handleShowDropdown = () => setShowDropdown(!showDropdown);
  const handleHideDropdown = () => setShowDropdown((prev) => false);

  const navItems = [
    { label: "homePage", href: "/" },
    { label: "about", href: "/about" },
    { label: "contact us", href: "/contactus" },
    { label: "Create Post", href: "/create-blog" },
  ];
  const pathname = usePathname();

  console.log(session, "ses");
  return (
    <>
      <div className="flex justify-between my-4  px-5 py-5 shadow-lg  relative">
        <h2 className="">
          <Link href="/">MY BLOG</Link>
        </h2>

        {session?.user ? (
          <>
            <ul className="flex justify-center ">
              {navItems.map((navElm, index) => {
                return (
                  <li
                    key={index}
                    className={`mx-4 uppercase ${
                      pathname === navElm.href ? "text-blue-300" : null
                    }`}
                  >
                    <Link href={navElm.href}>{navElm.label}</Link>
                  </li>
                );
              })}
            </ul>

            <div>
              <Image
                src={vercel}
                onClick={handleShowDropdown}
                width="45"
                height="45"
              />
              {showDropdown && (
                <div className="absolute bg-gray-200 shadow-md">
                  <AiOutlineClose onClick={handleHideDropdown} />
                  <button
                    onClick={() => {
                      handleHideDropdown();
                      signOut();
                    }}
                  >
                    LogOut
                  </button>
                  <Link href="/create-blog">Create</Link>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="">
              <button
                className="px-2  rounded-md mr-4 py-2 bg-blue-500 text-white"
                onClick={() => signIn()}
              >
                Log in
              </button>
              <Link
                className="px-2 py-3 rounded-md bg-blue-500 text-white"
                href="/register"
              >
                register
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
