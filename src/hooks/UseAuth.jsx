import { useMutation } from '@tanstack/react-query';
import axiosUtils from '@/utils/axios-utils';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const LoginPost = async data => {
    const response = await axiosUtils.post('/auth/login', data);
    return response.data;
};

const RegisterPost = async data => {
    const response = await axiosUtils.post('/auth/register', data);
    return response.data;
};

const LogoutPost = async () => {
    try {
        await axiosUtils.post('/auth/logout');
    } catch (error) {
        throw new Error(error.message);
    }
};

export const useLogin = () => {
    const router = useRouter();

    return useMutation(LoginPost, {
        onSuccess: data => {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            router.push('/');
        },
        onError: err => {
            toast.warn('account or password is incorrect', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            console.log(err.message);
        },
    });
};

export const useRegister = () => {
    const router = useRouter();

    return useMutation(RegisterPost, {
        onSuccess: data => {
            toast.success('Register Success', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            router.push('/auth/login');
        },
        onError: err => {
            console.log(err);
        },
    });
};

export const useLogout = () => {
    const router = useRouter();

    return useMutation(LogoutPost, {
        onSuccess: data => {
            localStorage.setItem('currentUser', null);
            router.push('/');
        },
        onError: err => {
            console.log(err);
        },
    });
};
