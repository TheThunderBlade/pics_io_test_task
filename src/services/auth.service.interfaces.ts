import { ITokens } from "./token.service.interfaces";

export interface IUserCredentials {
  password: string;
  userName: string;
}

export interface IUserCredentialsSignUp extends IUserCredentials {
  email: string;
}

export interface IUserToken extends ITokens {
  email: string;
  userName: string;
}
