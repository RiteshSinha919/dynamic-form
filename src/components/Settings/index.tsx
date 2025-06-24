import React, { useState } from "react";
import { useUserProfile } from "../../store/UserProfileContext";
import { Link } from "react-router-dom";

const Settings: React.FC = () => {
  const { user, updateProfile } = useUserProfile();
  const [settings, setSettings] = useState({
    notificationsEnabled: user.notificationsEnabled,
    accountVisible: user.accountVisible,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(settings);
  };

  return (
    <div>
      <nav>
        <Link to="/profile">Profile Overview</Link> |{" "}
        <Link to="/profile/edit">Edit Profile</Link>
      </nav>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="checkbox"
              name="notificationsEnabled"
              checked={settings.notificationsEnabled}
              onChange={handleChange}
            />
            Enable Notifications
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="accountVisible"
              checked={settings.accountVisible}
              onChange={handleChange}
            />
            Account Visible
          </label>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default Settings;
