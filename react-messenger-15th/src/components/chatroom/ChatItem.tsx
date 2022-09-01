import styled, { css } from 'styled-components';
import { ChatType, UserType } from '../../Interface';
import { timeForToday } from '../../utils/timeForToday';
import Squircle from '../user/Squircle';
import React from 'react';
interface ChatItemProps {
    chat: ChatType;
    prevChat: ChatType;
    user: UserType;
    currentUser: UserType;
}

interface IsCurrentUserProps {
    isCurrentUser?: boolean;
    isPrevSame?: boolean;
}

const ChatItem = ({ chat, user, currentUser, prevChat }: ChatItemProps) => {
    const isCurrentUser = chat.userId === currentUser.userId;
    const isPrevSame = prevChat ? chat.userId === prevChat.userId : false;
    return (
        <ChatItemContainer isCurrentUser={isCurrentUser} isPrevSame={isPrevSame}>
            {isCurrentUser ? (
                <ChatWrapper isCurrentUser={isCurrentUser}>
                    <ChatDate isCurrentUser={isCurrentUser}>{timeForToday(chat.date)}</ChatDate>
                    <ChatBubble isCurrentUser={isCurrentUser} isPrevSame={isPrevSame}>
                        {chat.content}
                    </ChatBubble>
                </ChatWrapper>
            ) : (
                <>
                    <ProfileImage>{!isPrevSame && <Squircle imageUrl={user.profileImage} selected={false} size={40} />}</ProfileImage>
                    <div>
                        {!isPrevSame && <div style={{ color: '#333' }}>{user.userName}</div>}
                        <ChatWrapper isCurrentUser={isCurrentUser}>
                            <ChatBubble isCurrentUser={isCurrentUser} isPrevSame={isPrevSame}>
                                {chat.content}
                            </ChatBubble>
                            <ChatDate isCurrentUser={isCurrentUser}>{timeForToday(chat.date)}</ChatDate>
                        </ChatWrapper>
                    </div>
                </>
            )}
        </ChatItemContainer>
    );
};

export default React.memo(ChatItem);

const ChatItemContainer = styled.div<IsCurrentUserProps>`
    font-size: 13px;
    width: 100%;
    ${({ isPrevSame }) =>
        isPrevSame
            ? css`
                  margin-top: none;
              `
            : css`
                  margin-top: 12px;
              `}
    ${({ isCurrentUser }) =>
        !isCurrentUser &&
        css`
            display: grid;
            grid-template-columns: 40px auto;
            grid-gap: 12px;
        `}
        &:last-of-type {
        margin-bottom: 12px;
    }
`;

const ProfileImage = styled.div<IsCurrentUserProps>`
    width: 40px;
    height: 40px;
    background-color: transparent;
    border-radius: 12px;
`;

const ChatWrapper = styled.div<IsCurrentUserProps>`
    display: flex;
    ${({ isCurrentUser }) =>
        isCurrentUser
            ? css`
                  justify-content: flex-end;
              `
            : css``}
`;

// asdfasdfsadfasdf 와 같이 영어를 공백없이 길게 넣었을때 줄바꿈이 되지않고
// 화면을 넘어가는 경우가 있음.
// 왜이럴까요
const ChatBubble = styled.div<IsCurrentUserProps>`
    padding: 10px;
    white-space: pre-wrap;
    word-break: break-all;
    border-radius: 5px;
    margin-top: 8px;
    position: relative;
    ${({ isCurrentUser }) =>
        isCurrentUser
            ? css`
                  background-color: #fbe64d;
                  margin-left: 8px;
              `
            : css`
                  background-color: #fff;
                  margin-right: 8px;
              `};
    ${({ isPrevSame, isCurrentUser }) =>
        !isPrevSame &&
        isCurrentUser &&
        css`
            &:before {
                content: '';
                width: 0px;
                height: 0px;
                position: absolute;
                border-left: 5px solid #fbe64d;
                border-right: 5px solid transparent;
                border-top: 5px solid #fbe64d;
                border-bottom: 5px solid transparent;
                border-radius: 1px;
                right: -6px;
                top: 6px;
            }
        `}
    ${({ isPrevSame, isCurrentUser }) =>
        !isPrevSame &&
        !isCurrentUser &&
        css`
            &:before {
                content: '';
                width: 0px;
                height: 0px;
                position: absolute;
                border-left: 5px solid transparent;
                border-right: 5px solid #fff;
                border-top: 5px solid #fff;
                border-bottom: 5px solid transparent;
                left: -6px;
                top: 6px;
            }
        `}
`;
const ChatDate = styled.div<IsCurrentUserProps>`
    font-size: 8px;
    color: #333;
    display: flex;
    align-items: flex-end;
    min-width: 50px;
    ${({ isCurrentUser }) =>
        isCurrentUser
            ? css`
                  justify-content: flex-end;
              `
            : css`
                  justify-content: flex-start;
              `}
`;
