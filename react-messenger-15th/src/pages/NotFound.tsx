import styled from 'styled-components';

const NotFound = () => {
    return (
        <NotFoundContainer>
            <h2>잘못된 접근입니다.</h2>
        </NotFoundContainer>
    );
};

export default NotFound;

const NotFoundContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
