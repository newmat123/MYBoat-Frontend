import { environment_ } from "./shared.types";

export type data_ = {
  // requestSuccess: boolean;
  waterInBilge: boolean;
  temperature: environment_;
  heat: environment_;
  humidity: environment_;
};

export type contextType_ = {
  getTemperature: () => void;
  getHeat: () => void;
  getHumidity: () => void;
  changeSelected: (selected: boolean, str: string) => void;
  resetBilgeStatus: () => void;
  setSelectedControl: (str: string | undefined) => void;
  data: data_;
  selectedControl: string | undefined;
};
