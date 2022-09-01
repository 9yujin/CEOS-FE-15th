import styled, { css } from 'styled-components';
import { ChatType, UserType } from '../../Interface';
import { timeForToday } from '../../utils/timeForToday';
import Squircle from '../user/Squircle';
import React from 'react';
const ListItem = ({ user, lastChat, handleClick }: { user: UserType; lastChat?: ChatType; handleClick: () => void }) => {
    const lastChatContent = lastChat?.content;
    const lastChatDate = lastChat?.date;
    return (
        <Item room={lastChat} onClick={handleClick}>
            <ProfileIcon room={lastChat}>
                <Squircle imageUrl={user.profileImage} selected={false} size={lastChat ? 45 : 40} />
            </ProfileIcon>
            <Info>
                <div>{user.userName}</div>
                <InfoSub>{lastChat ? lastChatContent : user.statusMessage}</InfoSub>
            </Info>
            {lastChatDate && <LastDate>{timeForToday(lastChatDate)}</LastDate>}
        </Item>
    );
};

export default React.memo(ListItem);

const Item = styled.div<{ room: ChatType | undefined }>`
    display: flex;
    align-items: center;
    ${({ room }) =>
        room
            ? css`
                  padding: 12px 18px;
              `
            : css`
                  padding: 8px 18px;
              `}
    cursor: default;
    &:hover {
        background-color: #f7f8f8;
    }
`;

const ProfileIcon = styled.div<{ room: ChatType | undefined }>`
    margin-right: 10px;
    /* ${({ room }) =>
        room
            ? css`
                  width: 45px;
                  height: 45px;
              `
            : css`
                  width: 40px;
                  height: 40px;
              `} */
`;

const Info = styled.div`
    font-size: 15px;
    color: black;
`;

const InfoSub = styled.div`
    color: #7f7f7f;
    font-size: 12px;
    margin-top: 2px;
    width: 100%;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap: break-word;
`;

const LastDate = styled.div`
    color: #b3b3b3;
    font-size: 12px;
    margin-left: auto;
    margin-bottom: auto;
    min-width: 50px;
    text-align: right;
`;
