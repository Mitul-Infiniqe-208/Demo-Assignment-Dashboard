import { login } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";


export const useLogin = () => {
    const {mutateAsync,data,isPending} = useMutation({
        mutationFn: login,
        onSuccess: (data)=> {
            console.log('useLogin',data);
        },
        onError: (error) => {
            console.log(error);
        }
    });

    return {
        data,
        isPending,
        login: mutateAsync
    }
    
}