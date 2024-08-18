import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://scic-job-task-server-lyart.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;