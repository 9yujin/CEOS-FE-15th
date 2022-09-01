/* eslint-disable no-console */
import { UserType } from '../../Interface';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';

interface SearchBoxProps {
    searchResult: UserType[];
    setSearchResult: Dispatch<SetStateAction<UserType[]>>;
}

const SearchBox = ({ searchResult, setSearchResult }: SearchBoxProps) => {
    // searchResult 상태가 바뀌면서 매번 페이지가 렌더링됨...
    // 그렇기 때문에 useRef로 변수 관리
    const initSearchResult = useRef(searchResult);
    const { value, onChange } = useInput('');
    useEffect(() => {
        setSearchResult(initSearchResult.current.filter((friend) => friend.userName.includes(value)));
    }, [value]);

    return <SearchBoxContainer placeholder="이름으로 검색" value={value} onChange={onChange} autoFocus />;
};

export default SearchBox;

const SearchBoxContainer = styled.input`
    background-color: #f8f8f8;
    border: 1px solid #f0f0f0;
    font-size: 12px;
    padding: 3px 10px;
    box-sizing: border-box;
    width: calc(100% - 36px);
    margin: 9px 18px;
`;
