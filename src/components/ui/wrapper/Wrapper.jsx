const Wrapper = ({ children, className = '' }) => {
    return (
        <div className={`w-[1400px] mx-auto flex ${className}`}>{children}</div>
    );
};

export default Wrapper;
