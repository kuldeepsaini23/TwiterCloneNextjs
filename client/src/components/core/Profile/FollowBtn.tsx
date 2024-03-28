"use client";
import { graphqlClient } from "@/clients/api";
import { graphql } from "@/gql";
import {
  followUserMutation,
  unfollowUserMutation,
} from "@/graphql/mutation/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

type Props = {
  userId: string;
  userInfo:any;
};

const FollowBtn = ({ userId,userInfo }: Props) => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const amIFollowing = useMemo(() => {
    if (!userId) return false;
    return (
      (user?.following?.findIndex((el: any) => el.id === userId) ?? -1) >= 0
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.following, userInfo?.id]);

  const handleFollowUser = useCallback(async () => {
    toast.loading("Following...",{id:'follow'});
    await graphqlClient.request(followUserMutation, {
      to: userId,
    });
    queryClient.invalidateQueries(["currentUser"]);
    toast.success("Followed",{id:'follow'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo,queryClient]);

  const handleUnfollowUser = useCallback(async () => {
    toast.loading("Unfollowing...",{id:'unfollow'});
    await graphqlClient.request(unfollowUserMutation, {
      to: userId,
    });
    queryClient.invalidateQueries(["currentUser"]);
    toast.success("Unfollowed",{id:'unfollow'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo,queryClient]);

  return (
    <React.Fragment>
      {user?.id !== userId && (
        <>
          {amIFollowing ? (
            <button
              onClick={handleUnfollowUser}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={handleFollowUser}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Follow
            </button>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default FollowBtn;
