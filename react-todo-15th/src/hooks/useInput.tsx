import { useState, ChangeEvent } from 'react';

const useInput = (initialState: string) => {
    const [value, setValue] = useState(initialState);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return { value, onChange, setValue };
};

export default useInput;
