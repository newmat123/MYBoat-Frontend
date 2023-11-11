import SettingsPagesController from "../controllers/pages/settings.controller";

function Settings() {
  return (
    <div className="flex justify-center bg-black min-h-screen text-white">
      <div className="flex flex-col justify-between w-screen">
        <SettingsPagesController />
      </div>
    </div>
  );
}

export default Settings;
