import apiError from "./error.service";
import db from "../models";
import bcrypt from "bcrypt";
import {
  IUserCredentials,
  IUserCredentialsSignUp,
  IUserToken,
} from "./auth.service.interfaces";
import tokenService from "./token.service";
import { ITokens } from "./token.service.interfaces";

class authService {
  registration = async ({
    email,
    userName,
    password,
  }: IUserCredentialsSignUp): Promise<void> => {
    const checkingForEmail = await db.User.findOne({ email });
    if (checkingForEmail) {
      throw apiError.conflict("User with this email already exists");
    }
    const checkingForUserName = await db.User.findOne({ userName });
    if (checkingForUserName) {
      throw apiError.conflict("User with this UserName already exists");
    }

    const hashPassword = await bcrypt.hash(password, 5);
    await db.User.create({
      email: email,
      password: hashPassword,
      userName: userName,
    });
  };

  login = async ({
    userName,
    password,
  }: IUserCredentials): Promise<IUserToken> => {
    const user = await db.User.findOne({ userName });
    if (!user) {
      throw apiError.notFound("User with this username not found");
    }
    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      throw apiError.badRequest("Invalid password");
    }

    const tokens = tokenService.generateTokens({
      userId: user._id,
      email: user.email,
    });
    await tokenService.saveToken({
      userId: user._id,
      refreshToken: tokens.refreshToken,
    });

    return {
      ...tokens,
      userName: user.userName,
      email: user.email,
    };
  };

  refresh = async ({
    refreshToken,
  }: Omit<ITokens, "accessToken">): Promise<IUserToken> => {
    if (!refreshToken) {
      throw apiError.unauthorized("Invalid refresh token");
    }

    const { userId, email } = tokenService.validateRefreshToken({
      refreshToken,
    });
    const tokenFromDb = await db.Token.findOne({ refreshToken });

    if (!userId || !email || !tokenFromDb) {
      throw apiError.unauthorized("Token validation failed");
    }

    const user = await db.User.findOne({ _id: userId });
    const tokens = tokenService.generateTokens({ userId, email });
    await tokenService.saveToken({ userId, refreshToken: tokens.refreshToken });

    return {
      ...tokens,
      userName: user!.userName,
      email: user!.email,
    };
  };

  logout = async ({
    refreshToken,
  }: Omit<ITokens, "accessToken">): Promise<void> => {
    const token = await db.Token.findOne({ refreshToken });
    if (!token) {
      throw apiError.unauthorized("Token not found");
    } else {
      await tokenService.removeToken({ refreshToken });
    }
  };
}

export default new authService();
