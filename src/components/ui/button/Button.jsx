const Button = ({ text, onClick, type = 'button' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className='w-fit cursor-pointer py-[10px] px-5 rounded bg-[#1dbf73] hover:bg-[#19a463] text-white'>
            {text}
        </button>
    );
};

export default Button;
