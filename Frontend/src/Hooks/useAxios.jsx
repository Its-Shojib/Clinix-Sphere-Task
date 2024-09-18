import axios from "axios";

let axiosRoot = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    
})

const useAxios= () => {
    return axiosRoot;
}
export default useAxios;