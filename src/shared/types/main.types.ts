import { environment_ } from "./shared.types";

export type controls =
  | "wifi"
  | "control"
  | "temperature"
  | "humidity"
  | "heat"
  | "keel"
  | undefined;

export type data_ = {
  // requestSuccess: boolean;
  wifiStatus: boolean;
  ssid: string;
  pwd: string;
  waterInBilge: boolean;
  temperature: environment_;
  heat: environment_;
  humidity: environment_;
};

export type contextType_ = {
  resetBilgeStatus: () => void;
  handleSubmit: () => void;
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedControl: (con: controls) => void;
  data: data_;
  selectedControl: controls;
};
