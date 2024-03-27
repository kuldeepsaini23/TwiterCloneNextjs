import FeedCard from "@/components/core/Home/FeedCard";
import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";

interface TwitterSidebarButton{
  title : string;
  icon: React.ReactNode
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
  return (
    <main className="">
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-2 ml-8">
          <div className="text-2xl w-fit h-fit hover:bg-gray-600 rounded-full p-4 cursor-pointer transition-all">
            <BsTwitter /> 
          </div>
          <div className="mt-1 text-xl pr-4">
            <ul>
              {SideBarMenuItems?.map((item, index) => (
                <li key={index} className="flex items-center justify-start gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2">
                  <span className="text-3xl">
                    {item.icon}
                  </span>
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
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] border-gray-700 h-screen overflow-y-scroll">
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
        </div>
        <div className="col-span-3">
          <GoogleLogin onSuccess={(cred)=>console.log(cred)}/>
          </div>
      </div>
    </main>
  );
}
