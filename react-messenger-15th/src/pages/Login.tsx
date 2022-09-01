import LoginWithKakao from '../components/user/LoginWithKakao';
import styled from 'styled-components';
import { authState } from '../store/recoil';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const setAuth = useSetRecoilState(authState);
    const navigate = useNavigate();
    return (
        <LoginPage>
            <LoginWithKakao />
            <LoginWithGuest
                onClick={() => {
                    setAuth({ userName: '게스트', profileImage: 'https://i.ibb.co/kBV7WsL/2022-05-05-10-58-23.png', init: true });
                    navigate('/');
                }}
            >
                귀찮아요, 그냥 들어가게 해주세요
            </LoginWithGuest>
        </LoginPage>
    );
};

export default Login;

const LoginPage = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fcec5c;
    @media screen and (min-width: 600px) {
        border-radius: 15px;
    }
`;

const LoginWithGuest = styled.button`
    border: none;
    background-color: transparent;
    margin-top: 20px;
    font-size: 13px;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;
