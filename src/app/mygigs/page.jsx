'use client';
import Link from 'next/link';
import Button from '@/components/ui/button/Button';
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
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getCurrentUser from '@/utils/getCurrentUser';
import { getGigs, deleteGig } from './mygigsService';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(img, title, price, orders) {
    return { img, title, price, orders };
}

const rows = [
    createData(
        'https://images.pexels.com/photos/11295165/pexels-photo-11295165.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
        'Maria Anders',
        11,
        113
    ),
    createData(
        'https://images.pexels.com/photos/11295165/pexels-photo-11295165.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
        'Fransico Sanchez',
        11,
        113
    ),
    createData(
        'https://images.pexels.com/photos/11295165/pexels-photo-11295165.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
        'Roland Mendel',
        11,
        113
    ),
    createData(
        'https://images.pexels.com/photos/11295165/pexels-photo-11295165.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
        'Helen Bennet',
        11,
        113
    ),
    createData(
        'https://images.pexels.com/photos/11295165/pexels-photo-11295165.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
        'Yoshi Tanamuri',
        11,
        113
    ),
];

const MyGigs = () => {
    const queryClient = useQueryClient();

    const currentUser = getCurrentUser();

    const { isLoading, data, error } = useQuery({
        queryKey: ['myGigs'],
        queryFn: () => getGigs(currentUser._id),
    });

    const { mutate } = useMutation(deleteGig, {
        onSuccess: () => {
            queryClient.invalidateQueries('myGigs');
        },
    });

    const handleDelete = id => {
        mutate(id);
    };

    return (
        <div className='py-5'>
            <div className='w-default mx-auto'>
                <div className='flex justify-between'>
                    <h3 className='text-2xl font-bold'>Gigs</h3>
                    <Link href={'/add'}>
                        <Button text='Add New Gig' />
                    </Link>
                </div>
                <div className='py-10'>
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 700 }}
                            aria-label='customized table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>Image</TableCell>
                                    <TableCell align='left'>Title</TableCell>
                                    <TableCell align='left'>Price</TableCell>
                                    <TableCell align='left'>Sales</TableCell>
                                    <TableCell align='left'>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            {isLoading ? (
                                'Loading...'
                            ) : error ? (
                                'Error'
                            ) : (
                                <TableBody>
                                    {data.map(row => (
                                        <StyledTableRow key={row._id}>
                                            <TableCell align='left'>
                                                <img
                                                    src={
                                                        'http://localhost:5000/public/img/' +
                                                        row.images[0]
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
                                                {row.sales}
                                            </TableCell>
                                            <TableCell align='left'>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(row._id)
                                                    }>
                                                    <RiDeleteBin6Line color='red' />
                                                </button>
                                            </TableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default MyGigs;
