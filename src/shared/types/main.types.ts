import { environmentByDays_, environment_ } from "./shared.types";

export type data_ = {
  // requestSuccess: boolean;
  bilgeStatus: environment_;
  temperature: environmentByDays_;
  heat: environmentByDays_;
  humidity: environmentByDays_;
};

export type controlPanel = {
  light: boolean;
  heater: boolean;
};

export type contextType_ = {
  getTemperature: () => void;
  getHeat: () => void;
  getHumidity: () => void;
  getBilgeStatus: () => void;
  resetBilgeStatus: () => void;
  changeSelected: (selected: boolean, str: string) => void;
  setSelectedControl: (str: string | undefined) => void;
  controlPanelChange: (val: Partial<controlPanel>) => void;
  data: data_;
  controlPanel: controlPanel;
  selectedControl: string | undefined;
};
