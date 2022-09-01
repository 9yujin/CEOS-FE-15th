import { AuthType, RoomType, UserType } from '../Interface';
import { SetterOrUpdater } from 'recoil';
// userId 로 유저 정보 가져오기
export const getUserInfoById = (userId: number, userData: UserType[]): UserType => {
    const [userObj] = userData.filter((user) => user.userId === userId);
    return userObj;
};

// userId로 roomId 가져오기 (갠톡)
export const getRoomIdByUser = (userId: number, chatData: RoomType[]): number => {
    const [chatObj] = chatData.filter((room) => room.user[1]['userId'] === userId);
    return chatObj.roomId;
};

// 로그인
export const login = (name: string, image: string, setAuth: SetterOrUpdater<AuthType>, users: UserType[], setUsers: SetterOrUpdater<UserType[]>) => {
    setAuth({ userName: name, profileImage: image, init: true });
    setUsers(
        users.map((user) =>
            user.userId === 0
                ? {
                      userId: 0,
                      userName: name,
                      profileImage: image,
                      statusMessage: '',
                      myAccount: true,
                  }
                : user
        )
    );
    localStorage.setItem('name', name);
    localStorage.setItem('image', image);
};
