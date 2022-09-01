import { Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';
import FriendsList from './FriendsList';
import Navigator from '../components/list/Naviagator';
import RoomList from './RoomList';
import styled from 'styled-components';
import Setting from './Setting';
const Router = () => {
    return (
        <MainPage>
            <Navigator />
            <Routes>
                <Route path="/" element={<FriendsList />} />
                <Route path="/list" element={<RoomList />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </MainPage>
    );
};

export default Router;

const MainPage = styled.div`
    display: grid;
    height: 100%;
    grid-template-columns: 68px auto;
`;
