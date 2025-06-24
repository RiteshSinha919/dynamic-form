import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserProfile } from "../../types/UserProfileType";

interface UserProfileContextType {
  user: UserProfile;
  updateProfile: (profile: UserProfile) => void;
}

const defaultUser: UserProfile = {
  name: "test user",
  email: "test@gmail.com",
  address: "hyderabad",
  notificationsEnabled: true,
  accountVisible: true,
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const updateProfile = (profile: UserProfile) => {
    setUser((prev) => ({ ...prev, ...profile }));
  };

  return (
    <UserProfileContext.Provider value={{ user, updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
};
