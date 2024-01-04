import { Controller } from 'react-hook-form';
import { TextField } from '@/lib/mui';

const TextFieldMui = ({
    name,
    control,
    label,
    placeholder,
    type,
    rows,
    multiline = false,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <>
                    {label && <label htmlFor={name}>{label}</label>}
                    <TextField
                        helperText={error ? error.message : null}
                        size='small'
                        error={!!error}
                        onChange={onChange}
                        placeholder={placeholder}
                        value={value}
                        fullWidth
                        variant='outlined'
                        type={type}
                        multiline={multiline}
                        rows={rows}
                    />
                </>
            )}
        />
    );
};

export default TextFieldMui;
