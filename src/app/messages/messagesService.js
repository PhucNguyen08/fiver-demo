import newRequest from '@/utils/axios-utils';

const getConversations = async () => {
    const res = await newRequest.get('/conversations');
    return res.data;
};

const updateConversation = id => {
    return newRequest.put('/conversations/' + id);
};

const getSingleConversation = async id => {
    const res = await newRequest.get('/conversations/single/' + id);
    return res;
};

const createConversation = async value => {
    const res = await newRequest.post('/conversations/create', value);
    return res.data;
};

export {
    getConversations,
    updateConversation,
    getSingleConversation,
    createConversation,
};
