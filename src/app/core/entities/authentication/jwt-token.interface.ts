export interface IJwtToken {
  avatar: string;
  exp: number;
  iat: number;
  id: number;
  roles: Array<any>;
  username: string;
}
