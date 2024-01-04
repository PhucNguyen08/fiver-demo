'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DevTool } from '@hookform/devtools';
import { useLogin } from '@/hooks/UseAuth';
import TextFieldMui from '@/components/ui/textFieldMui/TextFieldMui';

const schema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required')
        .email('Email is not correct'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long'),
});
export default function Login() {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const { mutate } = useLogin();

    const onSubmit = data => {
        console.log(data);
        mutate(data);
    };
    return (
        <div className='grid place-items-center py-20'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className='flex flex-col gap-3 w-80'>
                <h3 className='text-2xl pb-4 font-medium'>Sign In</h3>
                <div className='flex flex-col gap-2'>
                    <TextFieldMui
                        name='email'
                        placeholder='Enter email ...'
                        control={control}
                        label='Email'
                        type={'text'}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <TextFieldMui
                        name='password'
                        placeholder='Enter password ...'
                        control={control}
                        label='Password'
                        type={'password'}
                    />
                </div>
                <p>
                    Need an account?{' '}
                    <Link
                        href={'/auth/register'}
                        className='underline text-blue-400 cursor-pointer'>
                        Sign Up
                    </Link>
                </p>
                <button className='w-full mt-2 cursor-pointer py-[10px] px-5 rounded bg-[#1dbf73] hover:bg-[#19a463] text-white'>
                    Login
                </button>
            </form>
            <DevTool control={control} />
        </div>
    );
}
