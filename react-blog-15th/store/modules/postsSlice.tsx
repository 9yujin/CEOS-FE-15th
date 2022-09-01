import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost, IPosts } from 'shared/interfaces';
import { posts as postsData } from '../../assets/json/posts.json';

export type TPostsState = IPosts;

const initialState: TPostsState = postsData;

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<IPost>) => {
      const nextPostId = (
        Math.max(...state.map((post) => parseInt(post.postId))) + 1
      ).toString();
      const newPost: IPost = {
        postId: nextPostId,
        title: action.payload.title,
        content: action.payload.content,
        date: action.payload.date,
      };
      return state.concat(newPost);
    },
    updatePost: (state, action: PayloadAction<IPost>) => {
      return state.map((post) =>
        post.postId === action.payload.postId
          ? {
              ...post,
              title: action.payload.title,
              content: action.payload.content,
            }
          : post
      );
    },
    removePost: (state, action: PayloadAction<string>) => {
      return state.filter((post) => post.postId !== action.payload);
    },
  },
});

export const { addPost, updatePost, removePost } = postsSlice.actions;
export default postsSlice.reducer;
