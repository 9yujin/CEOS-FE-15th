import GlobalStyle from './styles/GlobalStyle';
import { Main } from './styles/Container';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Router from './pages/Router';
import Login from './pages/Login';
import RequireAuth from './utils/RequireAuth';
import ChatRoom from './pages/ChatRoom';

function App() {
    return (
        <>
            <GlobalStyle />
            <RecoilRoot>
                <BrowserRouter>
                    <Main>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/*"
                                element={
                                    <RequireAuth>
                                        <Router />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="/room/:roomId"
                                element={
                                    <RequireAuth>
                                        <ChatRoom />
                                    </RequireAuth>
                                }
                            />
                        </Routes>
                    </Main>
                </BrowserRouter>
            </RecoilRoot>
        </>
    );
}

export default App;
