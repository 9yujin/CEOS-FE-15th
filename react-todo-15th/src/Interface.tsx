import { Dispatch, SetStateAction } from 'react';

export interface ITodoItem {
    id: string;
    content: string;
    done: boolean;
}

export interface ITodoItemContext {
    list: ITodoItem[];
    setList: Dispatch<SetStateAction<ITodoItem[]>>;
}
