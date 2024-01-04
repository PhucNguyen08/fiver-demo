import newRequest from '@/utils/axios-utils';

const getGig = async id => {
    const res = await newRequest.get('/gigs/single/' + id);
    return res.data;
};

export default getGig;
