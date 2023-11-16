import { environment_ } from "./shared.types";

export type data_ = {
  // requestSuccess: boolean;
  bilgeStatus: environment_;
  temperature: environment_;
  heat: environment_;
  humidity: environment_;
};

export type contextType_ = {
  getTemperature: () => void;
  getHeat: () => void;
  getHumidity: () => void;
  getBilgeStatus: () => void;
  resetBilgeStatus: () => void;
  changeSelected: (selected: boolean, str: string) => void;
  setSelectedControl: (str: string | undefined) => void;
  data: data_;
  selectedControl: string | undefined;
};
