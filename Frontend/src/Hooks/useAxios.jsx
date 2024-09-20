import axios from "axios";

let axiosRoot = axios.create({
    baseURL: 'https://clinix-sphere-bice.vercel.app',
    withCredentials: true,
    
})

const useAxios= () => {
    return axiosRoot;
}
export default useAxios;