import ListHeader from '../components/list/ListHeader';
import { authState } from '../store/recoil';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
const Setting = () => {
    const setAuth = useSetRecoilState(authState);
    return (
        <SettingContainer>
            <ListHeader title={'더보기'} />
            <ListContainer>
                <SettingButton
                    onClick={() => {
                        localStorage.removeItem('name');
                        localStorage.removeItem('image');
                        setAuth({ userName: '', profileImage: '', init: false });
                    }}
                >
                    로그아웃
                </SettingButton>
                <a href="https://github.com/9yujin/react-messenger-15th" target="_blank">
                    <SettingButton>GitHub</SettingButton>
                </a>
            </ListContainer>
        </SettingContainer>
    );
};

export default Setting;

const SettingContainer = styled.div``;

const ListContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
`;

const SettingButton = styled.div`
    border: 8px;
    padding: 18px 0px;
    width: 100%;
    color: black;
    text-align: center;
    border-bottom: 1px solid #f4f4f4;
    font-size: 13px;
    cursor: pointer;
    &:hover {
        background-color: #f7f8f8;
    }
`;
