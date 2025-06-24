import React, { useState } from "react";
import { useUserProfile } from "../../store/UserProfileContext";
import { Link } from "react-router-dom";

const EditProfile: React.FC = () => {
  const { user, updateProfile } = useUserProfile();
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
  };

  return (
    <div>
      <nav>
        <Link to="/profile">Profile Overview</Link> |{" "}
        <Link to="/profile/settings">Settings</Link>
      </nav>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email: </label>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label>Address: </label>
          <input name="address" value={form.address} onChange={handleChange} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
