import jwt from "jsonwebtoken";
import db from "../models";
import {
  ISaveTokenPayload,
  ITokenPayload,
  ITokens,
} from "./token.service.interfaces";
import { IToken } from "../models/token.model";

class tokenService {
  generateTokens = (payload: ITokenPayload): ITokens => {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET!.toString(),
      {
        expiresIn: "1h",
      },
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET!.toString(),
      {
        expiresIn: "30d",
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  };

  saveToken = async ({
    userId,
    refreshToken,
  }: ISaveTokenPayload): Promise<IToken> => {
    const tokenData = await db.Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await db.Token.create({
      user: userId,
      refreshToken: refreshToken,
    });

    return token;
  };

  validateRefreshToken = ({
    refreshToken,
  }: Omit<ITokens, "accessToken">): ITokenPayload => {
    return jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!.toString(),
    ) as ITokenPayload;
  };

  removeToken = async ({
    refreshToken,
  }: Omit<ITokens, "accessToken">): Promise<void> => {
    await db.Token.deleteOne({ refreshToken });
  };
}

export default new tokenService();
