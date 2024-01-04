const formatMonthYear = date => {
    const newDate = new Date(date);

    const options = { month: 'long', year: 'numeric' };
    const formattedString = newDate.toLocaleString('en-US', options);
    return formattedString;
};

export { formatMonthYear };
