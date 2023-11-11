import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.MYBoat",
  appName: "MYBoat",
  webDir: "build",
  bundledWebRuntime: false,
  server: {
    cleartext: true,
  },
};

export default config;
