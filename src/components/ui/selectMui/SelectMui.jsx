import { FormControl, MenuItem, Select } from '@/lib/mui';
import { Controller } from 'react-hook-form';

const SelectMui = ({ name, control, label, children, placeholder }) => {
    return (
        <FormControl size='medium'>
            {label && <label htmlFor={name}>{label}</label>}
            <Controller
                render={({ field: { onChange, value } }) => (
                    <Select
                        defaultValue={'none'}
                        onChange={onChange}
                        value={value}>
                        {placeholder && (
                            <MenuItem value='none' disabled selected>
                                <em>{placeholder}</em>
                            </MenuItem>
                        )}
                        {children}
                    </Select>
                )}
                control={control}
                name={name}
            />
        </FormControl>
    );
};

export default SelectMui;
