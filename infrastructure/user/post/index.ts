export interface CreateUserParams {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  password: string;
  avatar: File;
  policy: boolean;
}

export interface AuthenticateUserParams {
  email: string;
  password: string;
}
