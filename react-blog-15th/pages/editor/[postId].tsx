import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { updatePost } from '../../store/modules/postsSlice';
import { IPost } from 'shared/interfaces';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useRouter } from 'next/router';
import { RootState } from 'store';

function Editor() {
  const router = useRouter();
  const posts = useAppSelector((state: RootState) => state.posts);
  const dispatch = useAppDispatch();
  const updatePostTrigger = useCallback(
    (postToUpdate: IPost) => dispatch(updatePost(postToUpdate)),
    [dispatch]
  );
  const [inputs, setInputs] = useState({ title: '', content: '' });
  const { title, content } = inputs;

  useEffect(() => {
    const i = posts.findIndex(
      (post: IPost) => post.postId === router.query.postId
    );
    if (i !== -1) {
      const prevPost = posts[i];
      setInputs({ title: prevPost.title, content: prevPost.content });
    }
  }, [router.query.postId]);

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
    const postToAdd = {
      postId: router.query.postId as string,
      title: title,
      content: content,
      date: '2022-05-18T22:11:18+09:00',
    };
    updatePostTrigger(postToAdd);
    // router.push(`/detail/${router.query.postId}`);
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
