'use client';
import { MenuItem, TextField } from '@/lib/mui';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldMui from '@/components/ui/textFieldMui/TextFieldMui';
import SelectMui from '@/components/ui/selectMui/SelectMui';
import newRequest from '@/utils/axios-utils';
import getCurrentUser from '@/utils/getCurrentUser';

const schema = yup.object().shape({
    title: yup.string().required('title is required'),
    category: yup.string().required('Category is required'),
    desc: yup.string().default(''),
    deliveryTime: yup.number().required('Delivery time is required'),
    features: yup.array(),
    price: yup.number().required('Price is required'),
});

const Add = () => {
    const [files, setFiles] = useState([]);
    const [feature, setFeature] = useState('');

    const currentUser = getCurrentUser();

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'features',
    });

    const handleChange = e => {
        setFiles(e.target.files);
    };

    const onSubmit = async data => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('pictures', files[i]);
        }
        for (let key in data) {
            formData.append(key, data[key]);
        }
        await newRequest.post('/gigs/create', formData);
    };

    return (
        <div className='py-20'>
            <div className='w-default mx-auto'>
                <h3 className='text-2xl font-semibold'>Add New Gig</h3>
                <form className='flex gap-40' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex-1 pt-2 flex flex-col gap-3 justify-between'>
                        <TextFieldMui
                            name='title'
                            placeholder='Enter title ...'
                            control={control}
                            label='Title'
                            type={'text'}
                        />
                        <SelectMui
                            name={'category'}
                            control={control}
                            placeholder={'Select category'}
                            label='Category'>
                            <MenuItem value='design'>Design</MenuItem>
                            <MenuItem value={'web'}>Web Development</MenuItem>
                            <MenuItem value={'animation'}>Animation</MenuItem>
                            <MenuItem value={'music'}>Music</MenuItem>
                        </SelectMui>
                        <label>Upload Images</label>
                        <input
                            type='file'
                            multiple
                            onChange={handleChange}
                            name='pictures'
                        />
                        <TextFieldMui
                            name='desc'
                            placeholder='Enter Description ...'
                            control={control}
                            label='Description'
                            type={'text'}
                            multiline={true}
                            rows={5}
                        />
                        <button
                            type='submit'
                            className='bg-greenLight w-full p-5 text-white cursor-pointer rounded-lg font-semibold text-lg hover:bg-green'>
                            Create
                        </button>
                    </div>
                    <div className='flex-1 pt-2 flex flex-col gap-6'>
                        <TextFieldMui
                            name='deliveryTime'
                            placeholder='Enter delivery time ...'
                            control={control}
                            label='Delivery Time (e.g. 3days)'
                            type={'number'}
                        />
                        <label htmlFor=''>Add Features</label>
                        <div className='flex'>
                            <TextField
                                type='text'
                                variant='outlined'
                                placeholder='e.g page design'
                                className='flex-1'
                                value={feature}
                                onChange={e => setFeature(e.target.value)}
                            />
                            <button
                                type='button'
                                onClick={() => {
                                    append(feature);
                                    setFeature('');
                                }}
                                className='bg-greenLight p-2 text-white cursor-pointer rounded-lg font-semibold text-sm hover:bg-green'>
                                Add
                            </button>
                        </div>
                        {fields.map((item, index) => (
                            <div className='flex'>
                                <TextFieldMui
                                    name={`features.${index}`}
                                    control={control}
                                    type={'text'}
                                />
                                <button
                                    type='button'
                                    className='bg-greenLight p-2 text-white cursor-pointer rounded-lg font-semibold text-sm hover:bg-green'
                                    onClick={() => remove(index)}>
                                    X
                                </button>
                            </div>
                        ))}
                        <TextFieldMui
                            name='price'
                            placeholder='Enter Price ...'
                            control={control}
                            label='Price'
                            type={'number'}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Add;
