import apiClient from "@/lib/apiClient";

interface user {
      email : string
      password : string
}

export default function userLogin(payload:user) {
    return apiClient("/auth/login",{
        method: "POST",
        body: payload
    })
}