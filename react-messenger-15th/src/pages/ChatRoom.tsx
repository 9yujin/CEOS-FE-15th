import * as api from '../api';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { chatState, userState } from '../store/recoil';
import { RoomType, UserType } from '../Interface';
import SendMessage from '../components/chatroom/SendMessage';
import RoomHeader from '../components/chatroom/RoomHeader';
import styled from 'styled-components';
import RoomBody from '../components/chatroom/RoomBody';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ChatRoom = () => {
    const chatData = useRecoilValue<RoomType[]>(chatState);
    const userData = useRecoilValue<UserType[]>(userState);
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const { getChats, getUserInfoListByRoomId } = api;

    const { roomId } = useParams();
    if (!roomId) throw new Error('파람 필요');

    const chats = getChats(parseInt(roomId), chatData);
    const users = getUserInfoListByRoomId(parseInt(roomId), chatData, userData);

    // url에 직접 접근할때는 메인페이지로 리다이렉트
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (!location.state) {
            navigate('/');
        }
    }, [location]);

    //user list 첫번째 인덱스로 초기화
    useEffect(() => {
        if (!currentUser) setCurrentUser(users[0]);
    }, [currentUser, users]);

    return (
        <>
            {currentUser ? (
                <RoomContainer>
                    <RoomHeader users={users} currentUser={currentUser} setCurrentUser={setCurrentUser} />
                    <RoomBody chats={chats} users={users} currentUser={currentUser} />
                    <SendMessage roomId={parseInt(roomId)} chatData={chatData} userId={currentUser?.userId} />
                </RoomContainer>
            ) : null}
        </>
    );
};

export default ChatRoom;

const RoomContainer = styled.div`
    height: 100%;
    display: grid;
    grid-template-rows: 100px auto 120px;
`;
