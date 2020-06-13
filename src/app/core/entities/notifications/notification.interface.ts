import { IPost } from '../posts/post.interface';

export interface INotification {
  createdOn: number;
  id: number;
  notificationAuthor: {
    avatar: string,
    id: number,
    roles: Array<any>,
    username: string
  };
  post: IPost;
  status: string;
  type: string;
}
