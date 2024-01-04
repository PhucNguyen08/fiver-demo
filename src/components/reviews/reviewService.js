import newRequest from '@/utils/axios-utils';

const getReviews = async id => {
    const res = await newRequest.get('/reviews/' + id);
    return res.data;
};

const createReview = value => {
    return newRequest.post('/reviews/create', value);
};

export { getReviews, createReview };
