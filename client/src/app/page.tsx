"use client";
import FeedCard from "@/components/core/Home/FeedCard";
import Login from "@/components/core/Home/Login";
import { Tweet } from "@/gql/graphql";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { useCallback, useState } from "react";
import {
  BiHash,
  BiHomeCircle,
  BiImageAlt,
  BiMoney,
  BiUser,
} from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const SideBarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notifications",
    icon: <BsBell />,
  },
  {
    title: "Messages",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />,
  },
  {
    title: "Twitter Blue",
    icon: <BiMoney />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
  {
    title: "More Options",
    icon: <SlOptions />,
  },
];

export default function Home() {
  const { user } = useCurrentUser();
  const {tweets = []} = useGetAllTweets();
  const {mutate} = useCreateTweet();
  const [content, setContent] = useState("");

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    })
  }, [content,mutate]);

  return (
    <main className="">
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-2 ml-8 relative">
          <div className="text-2xl w-fit h-fit hover:bg-gray-600 rounded-full p-4 cursor-pointer transition-all">
            <BsTwitter />
          </div>
          <div className="mt-1 text-xl pr-4">
            <ul>
              {SideBarMenuItems?.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-start gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            {/* Tweet button */}
            <div className="mt-5 px-3 font-semibold">
              <button className="bg-[#1d9bf0] rounded-full w-full text-lg py-2 px-4">
                Tweet
              </button>
            </div>
          </div>
          {/* Profile */}
          {user && (
            <div className="absolute bottom-5 flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-full">
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
                <h1 className="text-xl">{`${user.firstName} ${user.lastName}`}</h1>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] border-gray-700 h-screen overflow-y-scroll">
          {/* Write your tweet */}
          <div>
            <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-4 hover:bg-slate-900">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-1">
                  {user?.profileImageURL && (
                    <Image
                      src={user.profileImageURL}
                      alt="user-image"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  )}
                </div>
                {/* TextArea */}
                <div className="col-span-11">
                  <textarea
                    className="w-full bg-transparent text-xl p-3 pt-0 border-b border-slate-700 focus:outline-none"
                    rows={3}
                    placeholder="What's happening?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <div className="mt-2 flex justify-between items-center">
                    <BiImageAlt
                      onClick={handleSelectImage}
                      className="text-xl cursor-pointer"
                    />
                    <button className="bg-[#1d9bf0] rounded-full text-sm py-2 px-4" onClick={handleCreateTweet}>
                      Tweet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
         {tweets?.map((tweet) => (
            tweet ? <FeedCard key={tweet.id} tweet={tweet as Tweet} /> : null
          ))}
         
        </div>
        <div className="col-span-3">{!user && <Login />}</div>
      </div>
    </main>
  );
}
