import { login } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { toast } from "sonner"

export const useLogin = () => {
    const {mutateAsync,data,isPending} = useMutation({
        mutationFn: login,
        onSuccess: (data)=> {
            console.log('useLogin',data);
            toast('Login Successfull');
            redirect('/dashboard');
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