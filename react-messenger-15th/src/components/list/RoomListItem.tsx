import { RoomType } from '../../Interface';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../store/recoil';
import { getUserInfoById } from '../../api';
import { useCallback } from 'react';
import ListItem from './ListItem';
import React from 'react';

const RoomListItem = ({ room }: { room: RoomType }) => {
    const navigate = useNavigate();
    const userData = useRecoilValue(userState);
    const userId = room.user[1]['userId'];
    const user = getUserInfoById(userId, userData);
    const lastChat = room.chat[room.chat.length - 1];

    const handleClick = useCallback(() => {
        navigate(`/room/${room.roomId}`, { state: { access: true } });
    }, []);

    return <ListItem user={user} lastChat={lastChat} handleClick={handleClick} />;
};

export default RoomListItem;
