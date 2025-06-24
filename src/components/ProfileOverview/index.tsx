import React from "react";
import { useUserProfile } from "../../store/UserProfileContext";
import { Link } from "react-router-dom";

const ProfileOverview: React.FC = () => {
  const { user } = useUserProfile();

  return (
    <div>
      <nav>
        <Link to="/profile/edit">Edit Profile</Link> |{" "}
        <Link to="/profile/settings">Settings</Link>
      </nav>
      <h2>Profile Overview</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Address:</strong> {user.address}
      </p>
      <p>
        <strong>Notifications Enabled:</strong>{" "}
        {user.notificationsEnabled ? "Yes" : "No"}
      </p>
      <p>
        <strong>Account Visible:</strong> {user.accountVisible ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default ProfileOverview;
