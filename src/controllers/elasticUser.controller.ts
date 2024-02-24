import { Response, NextFunction } from "express";
import eUserService from "../services/elasticUser.services";
import { IAuthRequest } from "../middlewares/auth.middleware.interfaces";

class eUserController {
  insertUserDataset = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const { user } = req;  
      const { datasetName } = req.body;

      const eUserSvc = new eUserService(datasetName, user!);
      await eUserSvc.insertUser();
      
      return res.status(200).json({ message: 'Users has been added' });
    } catch (e) {
      next(e);
    }
  };

  getUserDataset = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
      const { user } = req;  
      const { datasetName } = req.body;

      const eUserSvc = new eUserService(datasetName, user!);
      const data = await eUserSvc.getUserByIndex();
      
      return res.status(200).json({ data });
    } catch (e) {
      next(e);
    }
  };
}

export default new eUserController();
