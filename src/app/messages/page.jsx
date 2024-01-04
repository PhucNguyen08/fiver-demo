'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@/lib/mui';
import Button from '@/components/ui/button/Button';
import Link from 'next/link';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getConversations, updateConversation } from './messagesService';
import moment from 'moment';
import { toast } from 'react-toastify';
import getCurrentUser from '@/utils/getCurrentUser';

const Messages = () => {
    const { isLoading, data, error } = useQuery({
        queryKey: ['conservations'],
        queryFn: getConversations,
    });

    const { mutate } = useMutation(updateConversation, {
        onSuccess: () => {
            queryClient.invalidateQueries('conservations');
        },
        onError: err => {
            toast.warn(err.response.data, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        },
    });

    const handleRead = id => {
        mutate(id);
    };

    const currentUser = getCurrentUser();

    return (
        <div className='py-5'>
            {isLoading ? (
                'Loading...'
            ) : error ? (
                'Something went wrong'
            ) : (
                <div className='w-default mx-auto'>
                    <h3 className='text-2xl font-bold'>Messages</h3>
                    <div className='py-10'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            align='left'
                                            className='font-bold'>
                                            {currentUser.isSeller
                                                ? 'Buyer'
                                                : 'Seller'}
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            className='font-bold'>
                                            Last Message
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            className='font-bold'>
                                            Date
                                        </TableCell>
                                        <TableCell
                                            align='left'
                                            className='font-bold'>
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map(row => (
                                        <TableRow
                                            key={row.id}
                                            className={
                                                ((currentUser.isSeller &&
                                                    !row.readBySeller) ||
                                                    (!currentUser.isSeller &&
                                                        !row.readByBuyer)) &&
                                                'bg-[#1dbf730f]'
                                            }>
                                            <TableCell align='left'>
                                                {currentUser.isSeller
                                                    ? row.buyerId.username
                                                    : row.sellerId.username}
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Link
                                                    href={'/message/' + row.id}>
                                                    {row.lastMessage?.substring(
                                                        0,
                                                        100
                                                    )}
                                                </Link>
                                            </TableCell>
                                            <TableCell align='left'>
                                                {moment(
                                                    row.updatedAt
                                                ).fromNow()}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {((currentUser.isSeller &&
                                                    !row.readBySeller) ||
                                                    (!currentUser.isSeller &&
                                                        !row.readByBuyer)) && (
                                                    <Button
                                                        text='Mark as Read'
                                                        onClick={() =>
                                                            handleRead(row.id)
                                                        }
                                                    />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messages;
