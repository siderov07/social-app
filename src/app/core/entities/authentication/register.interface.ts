export interface IRegisterForm {
  username: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  avatar: string;
  id: number;
  roles: Array<any>;
  username: string;
}
