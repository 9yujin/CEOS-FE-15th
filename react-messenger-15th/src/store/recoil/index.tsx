import { atom } from 'recoil';
import { RoomType, UserType, AuthType } from '../../Interface';
import chatData from '../chatData.json';
import userData from '../userData.json';

export const chatState = atom<RoomType[]>({
    key: 'chats',
    default: chatData.rooms,
});

const getLocalStorage = (): AuthType => {
    const name = localStorage.getItem('name');
    const image = localStorage.getItem('image');
    if (name && image) {
        return {
            userName: name,
            profileImage: image,
            init: true,
        };
    } else {
        return {
            userName: '게스트',
            profileImage: 'https://i.ibb.co/kBV7WsL/2022-05-05-10-58-23.png',
            init: false,
        };
    }
};

const getInitUser = () => {
    const { userName, profileImage } = getLocalStorage();

    return {
        userId: 0,
        userName: userName,
        profileImage: profileImage,
        statusMessage: '',
        myAccount: true,
    };
};

export const userState = atom<UserType[]>({
    key: 'users',
    default: userData.users.map((user) => (user.userId === 0 ? getInitUser() : user)),
});

export const authState = atom<AuthType>({
    key: 'auth',
    default: getLocalStorage(),
});
