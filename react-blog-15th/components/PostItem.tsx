import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
function PostItem({ data }: any) {
  const date = dayjs(data.date).format('YYYY.MM.DD');

  return (
    <Wrapper>
      <Title>{data.title}</Title>
      <Date>{date}</Date>
      <Content>{data.content}</Content>
    </Wrapper>
  );
}

export default PostItem;

const Wrapper = styled.div`
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  // background-color: #e0e0e0;
  border-top: 4px solid black;
  &:hover {
    h2 {
      text-decoration: underline;
    }
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  padding: 20px 0;
  color: black;
`;

const Date = styled.div`
  color: #d3d3d3;
  margin: 10px 0;
`;

const Content = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.darkGray};
  line-height: 1.2;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;
