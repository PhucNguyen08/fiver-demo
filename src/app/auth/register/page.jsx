'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DevTool } from '@hookform/devtools';
import { getCountry } from '@/utils/country-api';
import { useRegister } from '@/hooks/UseAuth';
import { MenuItem, Box, Switch, TextareaAutosize, TextField } from '@/lib/mui';
import TextFieldMui from '@/components/ui/textFieldMui/TextFieldMui';
import SelectMui from '@/components/ui/selectMui/SelectMui';

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup
        .string()
        .required('Email is required')
        .email('Email is not correct'),
    country: yup.string().notOneOf([''], 'You must select an option!'),
    isSeller: yup.boolean(),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long'),
    cpassword: yup
        .string()
        .required('Password is mendatory')
        .oneOf([yup.ref('password')], 'Passwords does not match'),
    phoneNumber: yup.string().required('Phone number is required'),
    description: yup.string(),
});
export default function Register() {
    const [countries, setCountries] = useState([]);

    const { register, control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const { mutate } = useRegister();

    useEffect(() => {
        const loadData = async () => {
            const res = await getCountry();
            setCountries(res);
        };

        loadData();
    }, []);

    const onSubmit = data => {
        const formData = new FormData();
        const value = { ...data, picture: data.picture[0] };
        delete value.cpassword;
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                formData.append(key, value[key]);
            }
        }
        mutate(formData);
    };
    return (
        <div className='flex justify-around py-20'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className='w-[960px] flex gap-28'>
                <Box className='flex flex-col gap-3 flex-1'>
                    <h3 className='text-2xl pb-4 font-medium'>
                        Create a new account
                    </h3>
                    <div className='flex flex-col gap-2 mb-2'>
                        <TextFieldMui
                            name='username'
                            placeholder='Enter Username ...'
                            control={control}
                            label='Username'
                            type={'text'}
                        />
                    </div>
                    <div className='flex flex-col gap-2 mb-2'>
                        <TextFieldMui
                            name='email'
                            placeholder='Enter Email ...'
                            control={control}
                            label='Email'
                            type={'text'}
                        />
                    </div>
                    <div className='flex flex-col gap-2 mb-2'>
                        <SelectMui
                            name={'country'}
                            control={control}
                            label='Country'
                            placeholder={'Select country'}>
                            {countries.map((country, i) => (
                                <MenuItem key={i} value={country.name.common}>
                                    {country.name.common}
                                </MenuItem>
                            ))}
                        </SelectMui>
                    </div>
                    <div className='flex flex-col gap-2 mb-2'>
                        <TextFieldMui
                            name='password'
                            placeholder='Enter Password ...'
                            control={control}
                            label='Password'
                            type={'password'}
                        />
                    </div>
                    <div className='flex flex-col gap-2 mb-2'>
                        <TextFieldMui
                            name='cpassword'
                            placeholder='Enter Confirm Password ...'
                            control={control}
                            label='Confirm Password'
                            type={'password'}
                        />
                    </div>
                </Box>
                <Box className='flex flex-col gap-3 flex-1'>
                    <h3 className='text-2xl pb-4 font-medium'>
                        I want to become a seller
                    </h3>
                    <div className='flex gap-2 items-center'>
                        <p className='text-base'>Active the seller account</p>
                        <Switch {...register('isSeller')} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <TextFieldMui
                            name='phoneNumber'
                            placeholder='Enter Phone Number ...'
                            control={control}
                            label='Phone Number'
                            type={'text'}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor={'description'}>Description</label>
                        <TextareaAutosize
                            className='text-sm font-normal font-sans leading-5 p-3 rounded-xl rounded-br-none shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0'
                            minRows={3}
                            placeholder='Enter Description ...'
                            {...register('description')}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor={'picture'}>Profile</label>
                        <TextField
                            {...register('picture')}
                            type='file'
                            inputProps={{ accept: 'image/png, image/jpeg' }}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p>
                            Already have an account?{' '}
                            <Link
                                href={'/auth/login'}
                                className='underline text-blue-400 cursor-pointer'>
                                Sign In
                            </Link>
                        </p>
                        <button className='w-full mt-2 cursor-pointer py-[10px] px-5 rounded bg-[#1dbf73] hover:bg-[#19a463] text-white'>
                            Register
                        </button>
                    </div>
                </Box>
            </form>

            <DevTool control={control} />
        </div>
    );
}
