type strategyFunction = (
  possibleDestinations: { [key: string]: boolean }[],
) => boolean;

export interface IEvent {
  payload: object;
  possibleDestinations: { [key: string]: boolean }[];
  strategy?: "ALL" | "ANY" | strategyFunction;
}

export interface IParsedEvent {
  [key: string]: boolean[];
}
