import { signInSchema, signUpSchema } from "../schemas/auth.schemas";
import authService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import apiError from "../services/error.service";

class authController {
  registration = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, userName } = req.body;
      const { error } = signUpSchema.validate({ email, password, userName });
      if (error) {
        throw apiError.badRequest(error.message);
      }

      await authService.registration({ email, password, userName });
      return res.status(200).json({ message: "User was successfully created" });
    } catch (e) {
      next(e);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName, password } = req.body;
      const { error } = signInSchema.validate({ password, userName });
      if (error) {
        throw apiError.badRequest(error.message);
      }

      const userData = await authService.login({ userName, password });
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(200).json({
        token: userData.accessToken,
        email: userData.email,
        userName: userData.userName,
      });
    } catch (e) {
      next(e);
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;

      const userData = await authService.refresh({ refreshToken });
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.status(200).json({
        token: userData.accessToken,
        email: userData.email,
        userName: userData.email,
      });
    } catch (e) {
      next(e);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;

      await authService.logout({ refreshToken });
      res.clearCookie("refreshToken");

      return res.status(200).json({ message: "User was successfully log out" });
    } catch (e) {
      next(e);
    }
  };
}

export default new authController();
