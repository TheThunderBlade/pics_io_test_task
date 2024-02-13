import { Request, Response, NextFunction } from "express";
import destinationService from "../services/destination.service";
import { destinationSchema } from "../schemas/destination.schemas";
import apiError from "../services/error.service";

class destinationController {
  destinationProcessing = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { payload, possibleDestinations, strategy } = req.body;
      const { error } = destinationSchema.validate({
        payload,
        possibleDestinations,
        strategy,
      });
      if (error) {
        throw apiError.badRequest(error.message);
      }

      const destinationResponse = await destinationService.routeEvent({
        payload,
        possibleDestinations,
        strategy,
      });
      return res.status(200).json(destinationResponse);
    } catch (e) {
      next(e);
    }
  };
}

export default new destinationController();
