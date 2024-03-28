"use client";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
import toast from "react-hot-toast";

type Props = {};

const Login = (props: Props) => {
  const queryClient = useQueryClient();

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found`);
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success('Verified Successfully');

      if(verifyGoogleToken){
        window.localStorage.setItem('__twitter_token', verifyGoogleToken);
      }

      await queryClient.invalidateQueries(["currentUser"]);
    },
    [queryClient]
  );
  return (
    <div className="p-5 bg-slate-700 rounded-lg">
      <h1 className="text-2xl my-2">New to Twitter ?</h1>
      <GoogleLogin onSuccess={handleLoginWithGoogle} />
    </div>
  );
};

export default Login;
