import { useState, ChangeEvent } from 'react';

const useInput = (initialState: string) => {
    const [value, setValue] = useState(initialState);

    const onChange = (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>): void => {
        /* const targetValue = e.target.value;
        setValue(targetValue.replaceAll(/(\n|\r\n)/g, '<br>')); */
        setValue(e.target.value);
    };

    const resetValue = (): void => {
        setValue('');
    };

    return { value, onChange, resetValue };
};

export default useInput;
