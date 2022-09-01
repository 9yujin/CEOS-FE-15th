import styled from 'styled-components';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next';
import { wrapper } from 'store';
import dayjs from 'dayjs';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { removePost } from 'store/modules/postsSlice';
import Link from 'next/link';
import { store } from 'store';

function Detail({ post, id }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const date = post ? dayjs(post.date).format('YYYY.MM.DD HH:mm') : null;
  const dispatch = useAppDispatch();

  const onDelete = () => {
    confirm('정말 삭제하시겠습니까?')
      ? (dispatch(removePost(id)), router.replace('/'))
      : null;
  };

  return (
    <Wrapper>
      {date ? (
        <>
          <h1>{post.title}</h1>
          <Info>
            <Date>{date}</Date>
            <div>
              <Link href={`/editor/[id]`} as={`/editor/${post.postId}`}>
                <button>수정</button>
              </Link>
              <button onClick={onDelete}>삭제</button>
            </div>
          </Info>
          <Content>{post.content}</Content>
        </>
      ) : null}
      <Link href={`/`}>
        <button style={{ marginLeft: 'auto' }}>전체 글 보기</button>
      </Link>
    </Wrapper>
  );
}

export default Detail;

// https://github.com/vercel/next.js/blob/canary/examples/with-redux-wrapper/pages/index.js
export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const id = context.params.id;
    const posts = store.getState().posts;
    const [post] = posts.filter((post) => post.postId === id);
    return {
      props: { post, id },
    };
  }
);

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = store.getState().posts;
  const paths = posts.map((post) => ({ params: { id: post.postId } }));
  return {
    paths,
    fallback: true,
  };
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  h1 {
    color: ${({ theme }) => theme.color.blue};
    font-size: 2rem;
    font-weight: 700;
    padding: 50px 0;
  }

  button {
    margin-left: 10px;
    font-size: 1rem;
  }
`;

const Content = styled.div`
  margin: 30px 0px;
  padding: 30px 0px 100px 0px;
  border-top: 4px solid black;
  border-bottom: 1px solid black;
  white-space: pre-wrap;
  word-break: break-all;
  line-height: 1.5;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 10px 0;
`;

const Date = styled.div`
  color: ${({ theme }) => theme.color.darkGray};
`;
