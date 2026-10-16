
import { useMutation, useQuery } from "@tanstack/react-query";
import { googleOauth, userLogin, userLogout, userProfile, userRegistration } from "@/api";


export  function useLogin() {
    return useMutation({
         mutationFn : userLogin,
    })   
}

export  function useRegistration() {
    return useMutation({
         mutationFn : userRegistration,
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

