export interface ChatType {
    userId: number;
    content: string;
    date: string;
    like: boolean;
    chatId: string;
}
export interface RoomType {
    roomId: number;
    user: {
        userId: number;
    }[];
    chat: ChatType[];
}

export interface UserType {
    userId: number;
    userName: string;
    profileImage: string;
    statusMessage: string;
}

export interface AuthType {
    userName: string;
    profileImage: string;
    init: boolean;
}
