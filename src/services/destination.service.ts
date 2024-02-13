import fetch from "node-fetch";
import db from "../models";
import { IEvent, IParsedEvent } from "./destination.service.interfaces";
import apiError from "./error.service";
import destinations from "../config/destinations";

class destinationService {
  private _sendPayloadToDestination = async (
    payload: object,
    destination: string,
  ) => {
    const currentDestination = destinations.find(
      (item) => item.name === destination,
    );
    if (!currentDestination) {
      throw apiError.internal(`Unknown destination ${destination}`);
    }

    let request;
    switch (currentDestination!.transport) {
      case "http.post":
        request = fetch(String(currentDestination!.url), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        break;
      case "http.put":
        request = fetch(String(currentDestination!.url), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        break;
      case "http.get":
        request = fetch(String(currentDestination!.url), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        break;
      case "console.log":
        console.log("Logging:", payload);
        break;
      case "console.warn":
        console.warn("Warning:", payload);
        break;
      default:
        throw apiError.internal("Unknown transport");
    }

    return request;
  };

  private _handleAllStrategy = async (
    payload: object,
    parsedDestinations: IParsedEvent,
  ) => {
    const result: { [key: string]: boolean } = {};
    const requsets = [];

    for (const key in parsedDestinations) {
      const shouldSend = parsedDestinations[key].every((item) => item === true);
      result[key] = shouldSend;
      if (shouldSend) {
        requsets.push(this._sendPayloadToDestination(payload, key));
      }
    }

    await Promise.all(requsets);

    return result;
  };

  private _handleAnyStrategy = async (
    payload: object,
    parsedDestinations: IParsedEvent,
  ) => {
    const result: { [key: string]: boolean } = {};
    const requsets = [];

    for (const key in parsedDestinations) {
      const shouldSend = parsedDestinations[key].some((item) => item === true);
      result[key] = shouldSend;
      if (shouldSend) {
        requsets.push(this._sendPayloadToDestination(payload, key));
      }
    }

    await Promise.all(requsets);

    return result;
  };

  routeEvent = async ({ payload, possibleDestinations, strategy }: IEvent) => {
    const currentStrategy = strategy || "ANY";

    const parsedDestinations: IParsedEvent = {};
    possibleDestinations.forEach((obj) => {
      for (const key in obj) {
        if (key in obj) {
          if (key in parsedDestinations) {
            parsedDestinations[key].push(obj[key]);
          } else {
            parsedDestinations[key] = [obj[key]];
          }
        }
      }
    });

    let generatedResponse;

    switch (currentStrategy) {
      case "ALL":
        generatedResponse = await this._handleAllStrategy(
          payload,
          parsedDestinations,
        );
        break;
      case "ANY":
        generatedResponse = await this._handleAnyStrategy(
          payload,
          parsedDestinations,
        );
        break;
      default:
        throw apiError.badRequest("Unknown strategy");
    }

    await db.Destination.create({
      request: JSON.stringify({ payload, possibleDestinations, strategy }),
      response: JSON.stringify(generatedResponse),
    });

    return generatedResponse;
  };
}

export default new destinationService();
