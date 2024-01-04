import newRequest from '@/utils/axios-utils';

const getOrders = async () => {
    const res = await newRequest.get('/orders');
    return res.data;
};

export { getOrders };
