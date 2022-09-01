/* eslint-disable no-console */
import ListHeader from '../components/list/ListHeader';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/recoil';
import styled from 'styled-components';
import Squircle from '../components/user/Squircle';
import { ListBody } from '../styles/Container';
import UserListItem from '../components/list/UserListItem';
import { useState } from 'react';
import SearchBox from '../components/list/SearchBox';

const FriendsList = () => {
    const userList = useRecoilValue(userState);
    const me = userList[0];
    const friends = userList.slice(1);
    const [search, setSearch] = useState(false);
    const [searchResult, setSearchResult] = useState(friends);

    return (
        <div>
            <ListHeader title={'친구'} setSearch={setSearch} />
            <ListBody>
                {search ? (
                    <>
                        <SearchBox searchResult={searchResult} setSearchResult={setSearchResult} />
                        {searchResult.map((friend) => (
                            <UserListItem user={friend} key={friend.userId} />
                        ))}
                    </>
                ) : (
                    <>
                        <MyProfile>
                            <MyProfileIcon>
                                <Squircle imageUrl={me.profileImage} selected={false} size={55} />
                            </MyProfileIcon>
                            <div>{me.userName}</div>
                        </MyProfile>
                        <Divider />
                        <SubHeading>친구 {friends.length}</SubHeading>
                        {friends.map((friend) => (
                            <UserListItem user={friend} key={friend.userId} />
                        ))}
                    </>
                )}
            </ListBody>
        </div>
    );
};

export default FriendsList;

const MyProfile = styled.div`
    display: flex;
    align-items: center;
    padding: 18px;
    font-size: 15px;
`;

const MyProfileIcon = styled.div`
    // width: 55px;
    // height: 55px;
    margin-right: 12px;
`;

const Divider = styled.div`
    margin: 0px 18px;
    width: calc(100%-36px);
    height: 1px;
    background-color: #f4f4f4;
`;

const SubHeading = styled.div`
    color: #999999;
    font-size: 12px;
    padding: 10px 18px;
`;
