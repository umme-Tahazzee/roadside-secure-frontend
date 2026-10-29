import { ofetch } from "ofetch";


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const apiClient = ofetch.create({
       baseURL: BASE_URL,
       credentials: "include" //browser e cookie save kora  
})

export default apiClient