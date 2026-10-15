
import { useMutation, useQuery } from "@tanstack/react-query";
import { userLogin, userLogout, userProfile } from "@/api";

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

export  function useGetMe() {
    return useQuery({
          queryKey: ['user'],
          queryFn: userProfile,
          retry : false
    })
}