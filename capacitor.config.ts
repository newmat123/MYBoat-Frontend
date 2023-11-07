import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.boatManeger",
  appName: "BoatManeger",
  webDir: "build",
  bundledWebRuntime: false,
  server: {
    cleartext: true,
  },
};

export default config;
