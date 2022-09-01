// 1. https://blog.devgenius.io/using-styled-components-and-props-with-typescript-react-a3c32a496f47
// 2. https://krpeppermint100.medium.com/ts-useref-%EC%9E%90%EC%84%B8%ED%9E%88-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-typescript-uselayouteffect-c9f1cf02ca5a
// 3. https://close-up.tistory.com/entry/React-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%ED%8A%B9%EC%A0%95-%EC%98%81%EC%97%AD-%EC%99%B8-%ED%81%B4%EB%A6%AD-%EA%B0%90%EC%A7%80

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as Remove } from '../assets/remove.svg';
import { ReactComponent as Edit } from '../assets/edit.svg';
import { ReactComponent as Send } from '../assets/send.svg';
import useTodoContext from '../hooks/useTodoContext';
import useForm from '../hooks/useForm';
import { ITodoItem } from '../Interface';

interface ITodoItemProps {
    item: ITodoItem;
}

interface IBtn {
    done: boolean;
    edit: boolean;
}

const TodoItem = ({ item }: ITodoItemProps) => {
    const { id, content, done } = item;
    const { deleteItem, toggleItem, editItem } = useTodoContext();

    const [edit, setEdit] = useState(false);
    const { value, onChange, onSubmit } = useForm(item.content, editItem, item.id);

    const inputRef = useRef<HTMLInputElement>(null);
    const editFormRef = useRef<HTMLFormElement>(null);

    //참고3 : editForm 외의 부분을 클릭했을 때 setEdit(false)
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent): void => {
            if (editFormRef.current && !editFormRef.current.contains(e.target as Node)) {
                setEdit(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [inputRef]);

    // 참고2
    useEffect(() => {
        const { current } = inputRef;
        if (current !== null) {
            current.focus();
        }
    }, [edit]);

    const handleEditBtn = () => {
        setEdit(true);
    };

    return (
        <Item>
            {edit ? (
                <ItemEditForm
                    onSubmit={(e) => {
                        onSubmit(e);
                        setEdit(false);
                    }}
                    ref={editFormRef}
                >
                    <InputEdit value={value} onChange={onChange} ref={inputRef} />
                    <StyledSubmitEdit type="submit">
                        <Send />
                    </StyledSubmitEdit>
                </ItemEditForm>
            ) : (
                <ItemContentBox
                    onClick={() => {
                        toggleItem(id);
                    }}
                >
                    <RadioButton done={done} edit={false}></RadioButton>
                    <ItemContent>{content}</ItemContent>
                </ItemContentBox>
            )}
            <ItemContentBox>
                {edit ? (
                    ''
                ) : (
                    <>
                        <StyledEdit onClick={handleEditBtn} />
                        <StyledRemove onClick={() => deleteItem(item.id)} />
                    </>
                )}
            </ItemContentBox>
        </Item>
    );
};

export default TodoItem;

const Item = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 35px;
`;

const ItemContentBox = styled.div`
    display: flex;
    align-items: center;
`;

// 참고1
const RadioButton = styled.div<IBtn>`
    width: 16px;
    height: 16px;
    margin-right: 10px;
    border-radius: 50%;
    border: 2px solid #8989bb;
    cursor: pointer;
    background-color: ${(props: IBtn) => (props.done ? '#8989bb' : 'none')};
    &:hover {
        background-color: #cacae4;
        border-color: #cacae4;
    }
`;

const ItemContent = styled.div`
    cursor: pointer;
    line-height: 16px;
    width: 220px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const StyledRemove = styled(Remove)`
    padding-right: 10px;
    fill: #d3d3d3;
    &:hover {
        fill: black;
    }
`;

const ItemEditForm = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    width: 100%;
    border-radius: 8px;
    background-color: #f1f1f1;
`;

const InputEdit = styled.input`
    height: 30px;
    width: 260px;
    padding: 0px 10px;
    border: none;
    background-color: #f1f1f1;
    &:focus {
        outline: 0;
    }
`;

const StyledEdit = styled(Edit)`
    padding-right: 15px;
    fill: #d3d3d3;
    &:hover {
        fill: black;
    }
`;

const StyledSubmitEdit = styled.button`
    padding-right: 10px;
    fill: #black;
    border: none;
`;
