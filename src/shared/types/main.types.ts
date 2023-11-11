import { environment_ } from "./shared.types";

//might use portal instead
export type controls =
  | "control"
  | "temperature"
  | "humidity"
  | "heat"
  | "keel"
  | undefined;

export type data_ = {
  // requestSuccess: boolean;
  waterInBilge: boolean;
  temperature: environment_;
  heat: environment_;
  humidity: environment_;
};

export type contextType_ = {
  resetBilgeStatus: () => void;
  setSelectedControl: (con: controls) => void;
  data: data_;
  selectedControl: controls;
};
