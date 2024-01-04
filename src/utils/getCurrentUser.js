const getCurrentUser = () => {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        return JSON.parse(localStorage?.getItem('currentUser')) ?? null;
    }
};

export default getCurrentUser;
