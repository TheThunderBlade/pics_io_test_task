export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  userId: string;
  email: string;
}

export interface ISaveTokenPayload extends Omit<ITokens, "accessToken"> {
  userId: string;
}
