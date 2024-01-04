import axios from 'axios';

const getCountry = async () => {
    const res = await axios.get('https://restcountries.com/v3.1/all');
    return res.data;
};

export { getCountry };
