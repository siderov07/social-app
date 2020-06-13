export interface IUser {
  avatar: string;
  email: string;
  followers: Array<IUser>;
  followersCount: number;
  following: Array<IUser>;
  followingCount: number;
  id: number;
  isDeleted: boolean;
  postsCount: number;
  roles: Array<any>;
  username: string;
}
