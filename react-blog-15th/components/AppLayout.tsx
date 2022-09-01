import styled from 'styled-components';
import React from 'react';
import { media } from 'styles/theme';
function AppLayout({ children }) {
    return (
        <Wrapper>
            <Margin>
                <div>{children}</div>
            </Margin>
        </Wrapper>
    );
}

export default AppLayout;

const Wrapper = styled.div`
    width: 768px;
    margin: 0 auto;
    //background-color: #f3f3f3;
    ${media.custom(768)} {
        width: 100%;
        min-width: 300px;
    }

    h1 {
        color: ${({ theme }) => theme.color.blue};
        font-size: 2rem;
        font-weight: 700;
        padding: 50px 0;
    }
`;

const Margin = styled.div`
    margin: 0 20px;
`;
