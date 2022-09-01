import { useRecoilValue } from 'recoil';
import ListHeader from '../components/list/ListHeader';
import RoomListItem from '../components/list/RoomListItem';
import { chatState } from '../store/recoil';
const RoomList = () => {
    const roomList = useRecoilValue(chatState);
    return (
        <div>
            <ListHeader title={'채팅'} />
            {roomList.map((room) => (
                <RoomListItem room={room} key={room.roomId} />
            ))}
        </div>
    );
};

export default RoomList;
