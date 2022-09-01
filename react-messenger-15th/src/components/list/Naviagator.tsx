import styled from 'styled-components';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as FriendIcon } from '../../assets/friends.svg';
import { ReactComponent as ChatIcon } from '../../assets/chat.svg';
import { ReactComponent as ThreeDot } from '../../assets/threeDot.svg';
const Navigator = () => {
    const { pathname } = useLocation();

    return (
        <NavigatorFooter>
            <NavUl>
                <NavLi>
                    <Link to="/" replace>
                        {pathname === '/' ? (
                            <FriendIcon color={'#222222'} width={30} height={30} />
                        ) : (
                            <FriendIcon color={'#a1a1a1'} width={30} height={30} />
                        )}
                    </Link>
                </NavLi>
                <NavLi>
                    <Link to="/list" replace>
                        {pathname === '/list' ? (
                            <ChatIcon color={'#222222'} width={23} height={23} />
                        ) : (
                            <ChatIcon color={'#a1a1a1'} width={23} height={23} />
                        )}
                    </Link>
                </NavLi>
                <NavLi>
                    <Link to="/setting" replace>
                        {pathname === '/setting' ? (
                            <ThreeDot color={'#222222'} width={23} height={23} />
                        ) : (
                            <ThreeDot color={'#a1a1a1'} width={23} height={23} />
                        )}
                    </Link>
                </NavLi>
            </NavUl>
        </NavigatorFooter>
    );
};

export default Navigator;

const NavigatorFooter = styled.div`
    background-color: #e6e6e6;
    border-right: 1px solid #dfdfdf;
    @media screen and (min-width: 600px) {
        border-radius: 15px 0px 0px 15px;
    }
`;

const NavUl = styled.ul`
    margin: 0px;
    padding: 0px;
    padding: 18px;
`;

const NavLi = styled.li`
    padding-top: 24px;
    list-style: none;
    display: flex;
    justify-content: center;
`;
