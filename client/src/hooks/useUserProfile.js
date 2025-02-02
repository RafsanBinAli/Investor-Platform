import { useState, useEffect } from "react";
import { fetchUserData, saveUserProfile } from "../api/investor";

const useUserProfile = (username) => {
  const [userData, setUserData] = useState({
    Username: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    NID: "",
    occupation: "",
    country: "",
    city: "",
    industry: "",
    investmentType: "",
  });

  const loadUserData = async () => {
    if (username) {
      try {
        const data = await fetchUserData(username);
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    }
  };

  const handleSaveProfile = async (updatedData) => {
    try {
      await saveUserProfile(username, updatedData);
      await loadUserData(); // Reload data after successful update
      return true;
    } catch (error) {
      console.error("Error saving profile:", error);
      return false;
    }
  };

  useEffect(() => {
    loadUserData();
  }, [username]);

  return { userData, saveUserProfile: handleSaveProfile };
};

export default useUserProfile;