import { graphqlClient } from "@/clients/api";
import { CreateTweetData } from "@/gql/graphql";
import { createTweetMutation } from "@/graphql/mutation/tweet";
import { getAllTweets } from "@/graphql/query/tweet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ["all-tweets"],
    queryFn: () => graphqlClient.request(getAllTweets),
  });
  return { ...query, tweets: query.data?.getAllTweets };
};

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: CreateTweetData) =>
      graphqlClient.request(createTweetMutation, { payload }),
    onMutate: (payload) => toast.loading("Creating tweet...", { id: '1' }),
    onSuccess: async (payload) => {
      await queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === "all-tweets" });
      toast.success("Created Success", { id: '1' });
    },
  });
  return mutation;
};
