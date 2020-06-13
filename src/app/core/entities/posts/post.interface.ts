export interface IPost {
  isLiked?: boolean;
  id: number;
  createdOn: number;
  updatedOn: number;
  description: string;
  location: string;
  public: boolean;
  image: IPostImage;
  author: IPostAuthor;
  comments: Array<IPostComment>;
  commentsCount: number;
  likes: Array<{id: number, votedBy: IPostAuthor}>;
  likesCount: number;
}

interface IPostAuthor {
  id: number;
  username: string;
  avatar: string;
  roles: any[];
}

interface IPostImage {
  id: number;
  directLink: string;
  datetime: number;
  size: number;
}

export interface IPostComment {
  id: number;
  content: string;
  createdOn: number;
  updatedOn: number;
  author: IPostAuthor;
}
