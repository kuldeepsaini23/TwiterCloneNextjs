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
      await queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === "current-User" });
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
