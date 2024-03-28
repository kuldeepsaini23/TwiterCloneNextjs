"use client";
import React, { useMemo } from "react";
import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import Login from "@/components/core/Home/Login";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import Link from "next/link";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const TwitterLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useCurrentUser();
  console.log(user);
  const SideBarMenuItems: TwitterSidebarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <BiHomeCircle />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <BiHash />,
        link: "/",
      },
      {
        title: "Notifications",
        icon: <BsBell />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <BsEnvelope />,
        link: "/",
      },
      {
        title: "Bookmarks",
        icon: <BsBookmark />,
        link: "/",
      },
      {
        title: "Twitter Blue",
        icon: <BiMoney />,
        link: "/",
      },
      {
        title: "Profile",
        icon: <BiUser />,
        link: `/${user?.id}`,
      },
      {
        title: "More Options",
        icon: <SlOptions />,
        link: "/",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <div className="grid grid-cols-12 h-screen w-screen lg:max-w-[1200px] mx-auto">
      <div className="col-span-2 sm:col-span-3 pt-1 flex relative justify-end sm:pr-4">
        <div className="flex w-full justify-start flex-col items-center sm:items-end">
          <div className="w-full max-w-[212px] sm:pr-4 ">
            <div className="text-2xl self-start sm:mx-0 mx-auto w-fit h-fit hover:bg-gray-600 rounded-full p-4 cursor-pointer transition-all">
              <BsTwitter />
            </div>
          </div>

          <div className="mt-1 text-xl sm:pr-4">
            <div className="w-full ">
              {SideBarMenuItems?.map((item, index) => (
                <Link key={index} href={item.link}>
                  <div className="flex mx-auto sm:mx-0 items-center justify-start gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2">
                    <span className="text-xl sm:text-3xl">{item.icon}</span>
                    <span className="hidden md:inline">{item.title}</span>
                  </div>
                </Link>
              ))}
            </div>
            {/* Tweet button */}
            <div className="mt-5 px-3 font-semibold">
              <button className="bg-[#1d9bf0] rounded-full w-full text-lg py-2 px-4 hidden sm:block">
                Tweet
              </button>
              <button className="bg-[#1d9bf0] rounded-full w-full text-lg py-2 px-2 block sm:hidden mx-auto">
                <BsTwitter />
              </button>
            </div>
          </div>
        </div>
        {/* Profile */}
        {user && (
          <div className="absolute bottom-5 flex items-center gap-2 sm:px-3 sm:py-2 sm:bg-slate-800 rounded-full">
            {user?.profileImageURL && (
              <Image
                src={user.profileImageURL}
                alt="user-image"
                width={50}
                height={50}
                className="rounded-full"
              />
            )}
            <div>
              <h1 className="text-xl hidden sm:inline">{`${user.firstName} ${user.lastName}`}</h1>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-10 sm:col-span-6 border-r-[1px] border-l-[1px] border-gray-700 h-screen overflow-y-scroll">
        {children}
      </div>
      <div className="hidden sm:block sm:col-span-3 p-5">
        {!user ? (
          <Login />
        ) : (
          <div className="px-4 py-2 bg-slate-800 rounded-lg">
            <h1 className="text-2xl my-2">Users you may know</h1>
            {user?.recommendedUsers?.map((el) => (
              <div className="flex items-center gap-3 mt-2" key={el?.id}>
                {el?.profileImageURL && (
                  <Image
                    src={el?.profileImageURL}
                    alt="user-image"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="text-lg">{`${el?.firstName} ${el?.lastName}`}</p>
                <Link href={`/${el?.id}`} className="bg-white text-black text-sm px-3 py-2 w-full rounded-lg">
                  View
                </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TwitterLayout;
