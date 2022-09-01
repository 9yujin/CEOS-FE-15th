import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { addPost } from '../../store/modules/postsSlice';
import { IPost } from 'shared/interfaces';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useRouter } from 'next/router';
import { RootState } from 'store';
import dayjs from 'dayjs';

function Editor() {
  const router = useRouter();
  const posts = useAppSelector((state: RootState) => state.posts);
  const dispatch = useAppDispatch();
  const addPostTrigger = useCallback(
    (postToAdd: IPost) => dispatch(addPost(postToAdd)),
    [dispatch]
  );
  const [inputs, setInputs] = useState({ title: '', content: '' });
  const { title, content } = inputs;

  function handleInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function handleSubmitBtnClick() {
    const now = dayjs();
    const postToAdd = {
      postId: 'dummy',
      title: title,
      content: content,
      date: now.format(),
    };
    addPostTrigger(postToAdd);
    const nextPostId = posts.length + 1;
    // router.push(`/detail/${nextPostId}`);
    router.push(`/`);
  }

  return (
    <Block>
      <Title
        name="title"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={handleInputChange}
      />
      <Content
        name="content"
        placeholder="당신의 이야기를 적어보세요..."
        value={content}
        onChange={handleInputChange}
      />
      <BtnWrapper>
        <Link href={'/'}>
          <button>← 나가기</button>
        </Link>
        <button onClick={handleSubmitBtnClick}>출간하기</button>
      </BtnWrapper>
    </Block>
  );
}

export default Editor;

const Block = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-left: 3%;
  padding-right: 3%;
`;

const Title = styled.input`
  width: 100%;
  height: 100px;

  font-size: 3rem;
  font-weight: bold;

  margin-top: 3%;
  margin-bottom: 1%;
  border: none;

  ::placeholder {
    color: ${({ theme }) => theme.color.darkGray};
  }
  input::-webkit-input-placeholder {
    color: ${({ theme }) => theme.color.gray};
  }
  input:-ms-input-placeholder {
    color: ${({ theme }) => theme.color.gray};
  }
`;

const Content = styled.textarea`
  width: 100%;
  height: 500px;

  font-size: 1.5rem;
  line-height: 2rem;

  overflow: auto;
  border: none;

  ::placeholder {
    color: #a2a2a2;
    font-style: italic;
  }
  ::-webkit-input-placeholder {
    color: #a2a2a2;
    font-style: italic;
  }
  :-ms-input-placeholder {
    color: #a2a2a2;
    font-style: italic;
  }
`;

const BtnWrapper = styled.section`
  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    color: ${({ theme }) => theme.color.darkGray};
    font-size: 1.3rem;
  }
`;
