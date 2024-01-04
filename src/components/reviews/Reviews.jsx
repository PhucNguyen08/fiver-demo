import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReviews, createReview } from './reviewService';
import Review from '../review/Review';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldMui from '../ui/textFieldMui/TextFieldMui';
import { Rating } from '@/lib/mui';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
    comment: yup.string().required('comment is required'),
});

const Reviews = ({ gigId }) => {
    const [value, setValue] = useState(0);

    const queryClient = useQueryClient();

    const { isLoading, data, error } = useQuery({
        queryKey: ['review'],
        queryFn: () => getReviews(gigId),
    });

    const { mutate } = useMutation(createReview, {
        onSuccess: () => {
            queryClient.invalidateQueries('review');
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

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = data => {
        mutate({ gigId, comment: data.comment, star: value });
    };

    return (
        <div className='py-5'>
            <h3 className='text-xl font-semibold pb-5'>Reviews</h3>
            <div>
                {isLoading ? (
                    <span>Loading...</span>
                ) : error ? (
                    <span>Something went wrong</span>
                ) : (
                    data?.map(item => <Review item={item} key={item._id} />)
                )}
            </div>
            <div>
                <h3 className='text-xl font-semibold pb-5'>Add a review</h3>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col gap-2'>
                    <TextFieldMui
                        name='comment'
                        placeholder='Enter Comment ...'
                        control={control}
                        type={'text'}
                    />
                    <Rating
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                    <button
                        type='submit'
                        className='w-full mt-2 cursor-pointer py-[10px] px-5 rounded bg-[#1dbf73] hover:bg-[#19a463] text-white'>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Reviews;
