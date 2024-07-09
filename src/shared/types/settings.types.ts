export type data_ = {
  // requestSuccess: boolean;
  // wifiStatus: boolean;
  ssid: string;
  pwd: string;
};

export type contextType_ = {
  handleSubmit: () => void;
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayWify: boolean;
  wifiStatus: boolean;
  espTime: string|undefined;
  data: data_;
};
