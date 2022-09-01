export interface IPost {
  postId: string;
  title: string;
  content: string;
  date: string;
}

export interface IPosts extends Array<IPost> {}
