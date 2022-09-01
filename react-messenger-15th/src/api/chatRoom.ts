import { SetterOrUpdater } from 'recoil';
import { RoomType, ChatType, UserType } from '../Interface';
import { getUserInfoById } from './userInfo';

// 채팅 내역 가져오기
export const getChats = (roomId: number, chatData: RoomType[]) => {
    const [chatObj] = chatData.filter((room) => room.roomId === roomId);
    if (!chatObj) throw new Error('존재하지 않는 ID');
    return chatObj.chat;
};

// 채팅방 내 대화상대 id 가져오기
export const getUserIdListByRoom = (roomId: number, chatData: RoomType[]): number[] => {
    const [chatObj] = chatData.filter((room) => room.roomId === roomId);
    const userIdList = chatObj['user'].map((user) => user['userId']);
    return userIdList;
};

// 채팅방 내 대화상대 정보 가져오기
export const getUserInfoListByRoomId = (roomId: number, chatData: RoomType[], userData: UserType[]): UserType[] => {
    const userIdList = getUserIdListByRoom(roomId, chatData);
    //const userInfoList = userData.filter((user, index) => user.userId === userIdList[index]);
    const userInfoList = userIdList.map((userId) => getUserInfoById(userId, userData));
    return userInfoList;
};

// 채팅보내기
export const postMessage = (roomId: number, MessageObj: ChatType, chatData: RoomType[], setChatData: SetterOrUpdater<RoomType[]>) => {
    const [chatObj] = chatData.filter((room) => room.roomId === roomId);

    const newChatObj: RoomType = { ...chatObj, chat: [...chatObj.chat, MessageObj] };
    setChatData(chatData.map((room) => (room.roomId === roomId ? newChatObj : room)));
    return { status: 200 };
};
