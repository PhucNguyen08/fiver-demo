'use client';
import { useState } from 'react';
import Button from '@/components/ui/button/Button';
import { Breadcrumbs, Avatar, Divider } from '@/lib/mui';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getMessages } from './messageService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createMessage } from './messageService';
import getCurrentUser from '@/utils/getCurrentUser';

const Message = () => {
    const [valueMessage, setValueMessage] = useState('');
    const { id } = useParams();

    const { isLoading, data, error } = useQuery({
        queryKey: ['messages'],
        queryFn: () => getMessages(id),
    });

    const { mutate } = useMutation(createMessage, {
        onSuccess: () => {
            queryClient.invalidateQueries('messages');
        },
    });

    const currentUser = getCurrentUser();

    const handleSubmit = e => {
        e.preventDefault();
        mutate({
            conservationId: id,
            content: valueMessage,
        });
        setValueMessage('');
    };

    return (
        <div className='py-14'>
            <div className='w-[1200px] mx-auto'>
                <Breadcrumbs className='text-[#555]'>
                    <Link href={'/messages'} className='hover:underline'>
                        Messages
                    </Link>
                    <h3>John Doe</h3>
                </Breadcrumbs>
                {isLoading ? (
                    'Loading...'
                ) : error ? (
                    'error'
                ) : (
                    <div className='mt-8 flex flex-col gap-5 h-[500px] overflow-scroll overflow-x-hidden'>
                        {data.map(mess => (
                            <div
                                className={`flex gap-5 max-w-[600px] text-lg ${
                                    mess.userId._id === currentUser._id &&
                                    'flex-row-reverse self-end'
                                }`}>
                                <Avatar
                                    src={
                                        'http://localhost:5000/public/img/' +
                                        mess.userId.image
                                    }
                                    alt={mess.userId.username}
                                    sx={{
                                        width: '50px',
                                        height: '50px',
                                    }}
                                />
                                <p className='bg-[lightgray] p-5 rounded-r-2xl rounded-bl-2xl font-normal'>
                                    {mess.content}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                <Divider className='mt-5' />
                <form
                    className='flex justify-between items-center mt-5'
                    onClick={handleSubmit}>
                    <textarea
                        className='outline-0 border border-solid p-2 rounded-md w-3/5 focus:border-[blue]'
                        placeholder='Write a message...'
                        rows={3}
                        cols={50}
                        value={valueMessage}
                        onChange={e => setValueMessage(e.target.value)}
                    />
                    <Button text={'Send'} type='submit' />
                </form>
            </div>
        </div>
    );
};

export default Message;
