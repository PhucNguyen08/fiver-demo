import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import styles from './Arrow.module.css';

const ArrowRight = props => {
    return (
        <button
            onClick={props.onClick}
            className={`${props.class === undefined ? '' : props.class} ${
                styles.arrow
            } ${styles['arrow-next']} `}>
            <HiArrowRight />
        </button>
    );
};

const ArrowLeft = props => {
    return (
        <button
            onClick={props.onClick}
            className={`${props.class === undefined ? '' : props.class} ${
                styles.arrow
            } ${styles['arrow-prev']} `}>
            <HiArrowLeft />
        </button>
    );
};

export { ArrowLeft, ArrowRight };
