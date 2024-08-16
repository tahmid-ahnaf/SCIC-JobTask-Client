import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useEmployeeList = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: employeeList = [] } = useQuery({
        queryKey: ['employeeList'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/employees`);
            return res.data;
        }
    })

    return [employeeList, refetch]
};

export default useEmployeeList;