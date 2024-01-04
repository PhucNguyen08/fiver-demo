import newRequest from '@/utils/axios-utils';

const getGigs = async id => {
    const res = await newRequest.get('/gigs?userId=' + id);
    return res.data;
};

const deleteGig = async id => {
    return newRequest.delete('/gigs/' + id);
};

export { getGigs, deleteGig };
