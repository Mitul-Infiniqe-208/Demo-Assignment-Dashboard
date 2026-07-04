import { authCookies } from "@/lib/cookies";
import { login } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner"

export const useLogin = () => {
    const router = useRouter();
    const {mutateAsync,data,isPending} = useMutation({
        mutationFn: login,
        onSuccess: (data)=> {
            if (data?.status && data?.data?.accessToken) {
                authCookies.setTokens(data.data.accessToken, data.data.refreshToken);
                toast.success('Login Successful');
                router.push('/dashboard');
            } else {
                toast.error('Failed to Login', {
                    description: data?.message || 'Please try again.',
                });
            }
        },
        onError: (error) => {
            toast.error('Error While Login', {
                description: error?.message || 'Something went wrong. Please try again.',
            });
        }
    });

    return {
        data,
        isPending,
        login: mutateAsync
    }

}
