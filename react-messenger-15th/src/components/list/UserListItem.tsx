import { UserType } from '../../Interface';
import { useRecoilValue } from 'recoil';
import { chatState } from '../../store/recoil';
import { getRoomIdByUser } from '../../api';
import ListItem from './ListItem';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
const UserListItem = ({ user }: { user: UserType }) => {
    const chatData = useRecoilValue(chatState);
    const roomId = getRoomIdByUser(user.userId, chatData);
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(`/room/${roomId}`, { state: { access: true } });
    }, []);

    return <ListItem user={user} handleClick={handleClick} />;
};

export default React.memo(UserListItem);
