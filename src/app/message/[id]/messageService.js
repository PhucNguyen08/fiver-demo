import newRequest from '@/utils/axios-utils';

const getMessages = async id => {
    const res = await newRequest.get('/messages/' + id);
    return res.data;
};

const createMessage = value => {
    return newRequest.post('/messages/create', value);
};

export { getMessages, createMessage };
