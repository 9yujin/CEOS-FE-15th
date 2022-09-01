import styled from 'styled-components';
import { UserType } from '../../Interface';
import { Dispatch, SetStateAction } from 'react';
import Squircle from '../user/Squircle';
import { useNavigate } from 'react-router-dom';

interface RoomHeaderProps {
    users: UserType[];
    currentUser: UserType;
    setCurrentUser: Dispatch<SetStateAction<UserType | null>>;
}

const RoomHeader = ({ users, currentUser, setCurrentUser }: RoomHeaderProps) => {
    const navigate = useNavigate();

    return (
        <RoomHeaderContainer>
            <Close onClick={() => navigate(-1)} />
            <CurrentSelecter>
                {users.map((user) => (
                    <UserIcon onClick={() => setCurrentUser(user)} key={user.userId}>
                        {currentUser.userId === user.userId && <SelectedIcon>선택 중</SelectedIcon>}
                        <Squircle imageUrl={user.profileImage} selected={currentUser.userId === user.userId} size={50} />

                        <div style={{ fontSize: '10px', textAlign: 'center' }}>{user.userName}</div>
                    </UserIcon>
                ))}
            </CurrentSelecter>
        </RoomHeaderContainer>
    );
};

export default RoomHeader;

const RoomHeaderContainer = styled.div`
    background-color: #fff;
    padding: 16px;
    @media screen and (min-width: 600px) {
        border-radius: 15px 15px 0px 0px;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CurrentSelecter = styled.div`
    display: flex;
`;

const UserIcon = styled.div`
    width: 50px;
    margin-left: 16px;
    position: relative;
`;
const SelectedIcon = styled.div`
    position: absolute;
    color: white;
    font-size: 6px;
    top: 20px;
    left: 10px;
`;

const Close = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #ed6952;
    border: 1px solid #d04e41;
    margin-bottom: auto;
    position: relative;

    &:hover {
        &:after {
            content: '✕';
            position: absolute;
            font-size: 7px;
            left: 2px;
        }
    }
`;
