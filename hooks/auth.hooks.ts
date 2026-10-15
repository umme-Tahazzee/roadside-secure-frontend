
import { useMutation, useQuery } from "@tanstack/react-query";
import { googleOauth, userLogin, userLogout, userProfile } from "@/api";
import apiClient from "@/lib/apiClient";
import googleAuth from "@/providers/google-auth.provider";

export  function useLogin() {
    return useMutation({
         mutationFn : userLogin,
    })   
}

export  function useLogout() {
    return useMutation({
         mutationFn : userLogout,
    })   
}

export  function useGoogleAuth() {
    return useMutation({
         mutationFn : googleOauth,
    })   
}
export  function useGetMe() {
    return useQuery({
          queryKey: ['user'],
          queryFn: userProfile,
          retry : false
    })
}

