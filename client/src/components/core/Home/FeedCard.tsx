import { Tweet } from "@/gql/graphql";
import Image from "next/image";
import React from "react";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BiMessageRounded, BiUpload } from "react-icons/bi";

type Props = {
  tweet: Tweet;
};

const FeedCard = ({ tweet }: Props) => {
  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-4 hover:bg-slate-900">
      <div className="grid grid-cols-12 gap-2">
        {tweet?.author?.profileImageURL && (
          <div className="col-span-1">
            <Image
              src={tweet?.author?.profileImageURL}
              alt="profile-pic"
              height={50}
              width={50}
              className="rounded-full object-cover"
            />
          </div>
        )}
        <div className="col-span-11 pr-10">
          <h5>{`${tweet?.author?.firstName} ${tweet?.author?.lastName}`}</h5>

          <p>{tweet?.content}</p>

          <div className="flex justify-between mt-5 items-center text-xl p-2 w-[90%] ">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <AiOutlineRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
