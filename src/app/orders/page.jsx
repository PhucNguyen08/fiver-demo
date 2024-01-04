'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    styled,
} from '@/lib/mui';
import { useQuery } from '@tanstack/react-query';
import { ImMail4 } from 'react-icons/im';
import { getOrders } from './orderService';
import {
    getSingleConversation,
    createConversation,
} from '../messages/messagesService';
import { useRouter } from 'next/navigation';
import getCurrentUser from '@/utils/getCurrentUser';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Orders = () => {
    const router = useRouter();

    const { isLoading, data, error } = useQuery({
        queryKey: ['orders'],
        queryFn: getOrders,
    });

    const currentUser = getCurrentUser();

    const handleContact = async value => {
        const sellerId = value.sellerId._id;
        const buyerId = value.buyerId._id;
        const id = sellerId + buyerId;

        try {
            const res = await getSingleConversation(id);
        } catch (error) {
            if (error.response.status === 404) {
                const res = await createConversation({
                    to: currentUser.isSeller ? buyerId : sellerId,
                });
                router.push('/message/' + res.id);
            }
        }
    };

    return (
        <div className='py-5'>
            <div className='w-default mx-auto'>
                <h3 className='text-2xl font-bold'>Orders</h3>
                {isLoading ? (
                    'Loading...'
                ) : error ? (
                    'Something went wrong'
                ) : (
                    <div className='py-10'>
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 700 }}
                                aria-label='customized table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='left'>
                                            Image
                                        </TableCell>
                                        <TableCell align='left'>
                                            Title
                                        </TableCell>
                                        <TableCell align='left'>
                                            Price
                                        </TableCell>
                                        <TableCell align='left'>
                                            {currentUser?.isSeller
                                                ? 'Buyer'
                                                : 'Seller'}
                                        </TableCell>
                                        <TableCell align='left'>
                                            Contact
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map(row => (
                                        <StyledTableRow key={row._id}>
                                            <TableCell align='left'>
                                                <img
                                                    src={
                                                        'http://localhost:5000/public/img/' +
                                                        row.img
                                                    }
                                                    className='w-7 h-7 object-contain'
                                                />
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.title}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.price}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {currentUser.isSeller
                                                    ? row.buyerId.username
                                                    : row.sellerId.username}
                                            </TableCell>
                                            <TableCell align='left'>
                                                <button>
                                                    <ImMail4
                                                        color='blue'
                                                        size={24}
                                                        onClick={() =>
                                                            handleContact(row)
                                                        }
                                                    />
                                                </button>
                                            </TableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
