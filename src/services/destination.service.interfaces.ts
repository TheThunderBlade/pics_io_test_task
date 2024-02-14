export interface IEvent {
  payload: object;
  possibleDestinations: { [key: string]: boolean }[];
  strategy?: "ALL" | "ANY" | string | undefined;
}

export interface IParsedEvent {
  [key: string]: boolean[];
}
