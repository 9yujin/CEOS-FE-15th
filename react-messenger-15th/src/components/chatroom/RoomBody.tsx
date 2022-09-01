import styled, { css } from 'styled-components';
import { ChatType, UserType } from '../../Interface';
import ChatItem from './ChatItem';
import { useEffect, useRef, useState } from 'react';
import { getUserInfoById } from '../../api';
import { ReactComponent as Bottom } from '../../assets/bottom.svg';
import { throttle } from 'lodash';

interface RoomBodyProps {
    chats: ChatType[];
    users: UserType[];
    currentUser: UserType;
}

const RoomBody = ({ chats, users, currentUser }: RoomBodyProps) => {
    const [scrollButtonVisible, setScrollButtonVisible] = useState<boolean>(false);
    const [scrollBarVisible, setScrollBarVisible] = useState<boolean>(false);

    const bodyRef = useRef<HTMLDivElement>(null);

    // 맨 아래로 버튼 보이기 & 스크롤바 숨기기
    const handleScrollY = throttle(() => {
        if (bodyRef.current) {
            const roomBodyScrollY = bodyRef.current.scrollHeight - bodyRef.current.scrollTop;

            if (roomBodyScrollY > 800 && !scrollButtonVisible) {
                setScrollButtonVisible(true);
            } else if (roomBodyScrollY <= 800 && scrollButtonVisible) {
                setScrollButtonVisible(false);
            }
        }
        setScrollBarVisible(true);
        setTimeout(() => {
            setScrollBarVisible(false);
        }, 2000);
    }, 300);

    const goToBottom = () => {
        if (bodyRef.current) {
            bodyRef.current.scrollTo(0, bodyRef.current.scrollHeight);
        }
    };

    useEffect(() => {
        goToBottom();
        setScrollBarVisible(false);
    }, [chats]);

    const handleClickGoToBottom = () => {
        goToBottom();
    };

    return (
        <RoomBodyContainer ref={bodyRef} onScroll={handleScrollY} scrollBarVisible={scrollBarVisible}>
            {chats.map((chat: ChatType, index: number) => (
                <ChatItem
                    chat={chat}
                    prevChat={chats[index - 1]}
                    key={chat.chatId}
                    user={getUserInfoById(chat.userId, users)}
                    currentUser={currentUser}
                />
            ))}
            {scrollButtonVisible ? (
                <GoToBottom onClick={handleClickGoToBottom}>
                    <Bottom style={{ marginTop: '5px' }} />
                </GoToBottom>
            ) : null}
        </RoomBodyContainer>
    );
};

export default RoomBody;

const RoomBodyContainer = styled.div<{ scrollBarVisible: boolean }>`
    padding: 0px 10px 0px 16px;
    overflow-y: scroll;
    background-color: #8989bb;
    background-image: linear-gradient(315deg, #8989bb 0%, #a5a4cb 74%);
    position: relative;
    ${({ scrollBarVisible }) =>
        !scrollBarVisible &&
        css`
            &::-webkit-scrollbar-thumb {
                background-color: transparent;
                border-radius: 3px;
            }
        `}
`;

const GoToBottom = styled.button`
    position: sticky;
    bottom: 20px;
    float: right;

    background-color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.5) 0 0 5px;

    &:active {
        background-color: #f3f3f3;
        box-shadow: none;
    }
`;
