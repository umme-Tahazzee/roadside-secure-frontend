import apiClient from "@/lib/apiClient";

interface user {
      email : string
      password : string
}

export  function userLogin(payload:user) {
    return apiClient("/auth/login",{
        method: "POST",
        body: payload
    })
}

export  function userLogout() {
    return apiClient("/auth/logout",{
        method: "POST",
    })
}


export  function userProfile() {
    return apiClient("/auth/me")
}