"use client";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { BiImageAlt } from "react-icons/bi";
import FeedCard from "./FeedCard";
import { Tweet } from "@/gql/graphql";
import { graphqlClient } from "@/clients/api";
import { getSignedURLForTweetQuery } from "@/graphql/query/tweet";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {};

const TweetMainComponent = (props: Props) => {
  const [content, setContent] = useState("");
  const { tweets = [] } = useGetAllTweets();
  const { mutate } = useCreateTweet();
  const { user } = useCurrentUser();
  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;

      const { getSignedURLForTweet } = await graphqlClient.request(
        getSignedURLForTweetQuery,
        {
          imageType: file.type,
          imageName: file.name,
        }
      );

      if (getSignedURLForTweet) {
        toast.loading("Uploading...", { id: "2" });
        await axios.put(getSignedURLForTweet, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        toast.success("Uploaded", { id: "2" });
        const url = new URL(getSignedURLForTweet);
        const myFilePath = `${url.origin}/${url.pathname}`;
        setImageURL(myFilePath);
      }
    };
  }, []);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    const handlerFn = handleInputChangeFile(input);
    input.addEventListener("change", handlerFn);
    input.click();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
      imageURL,
    });
    setContent("");
  }, [content, imageURL, mutate]);
  return (
    <React.Fragment>
      <div>
        <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-4 hover:bg-slate-900">
          {user && (
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
                {imageURL && (
                  <Image
                    src={imageURL}
                    alt="tweet-image"
                    width={300}
                    height={300}
                  />
                )}
                <div className="mt-2 flex justify-between items-center">
                  <BiImageAlt
                    onClick={handleSelectImage}
                    className="text-xl cursor-pointer"
                  />
                  <button
                    className="bg-[#1d9bf0] rounded-full text-sm py-2 px-4"
                    onClick={handleCreateTweet}
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {tweets?.map((tweet) =>
        tweet ? <FeedCard key={tweet.id} tweet={tweet as Tweet} /> : null
      )}
    </React.Fragment>
  );
};

export default TweetMainComponent;
