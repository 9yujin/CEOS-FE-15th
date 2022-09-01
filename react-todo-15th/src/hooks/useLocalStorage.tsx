// https://www.daleseo.com/react-hooks-use-web-storage/
// https://stackoverflow.com/questions/67700374/use-localstorage-getitem-with-typescript

import { ITodoItem } from '../Interface';
import { useState, useEffect } from 'react';

// 당장은 필요하지 않더라도 재사용이 가능하게끔 짜는 습관 좋은것 같습니다!!
const useLocalStorage = (key: string, initialState: ITodoItem[]) => {
    // list state 초기화
    const [list, setList] = useState<ITodoItem[]>(() => JSON.parse(localStorage.getItem(key) || '[]') || initialState);

    // list 상태 변화할 때마다 로컬스토리지 동기화
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(list));
    }, [key, list]);

    return { list, setList };
};

export default useLocalStorage;
