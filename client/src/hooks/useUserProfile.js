// src/hooks/useUserProfile.js

import { useState, useEffect } from "react";

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

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/investor-profile?username=${username}`
      );
      const data = await response.json();
      setUserData(data.investor);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const saveUserProfile = async (updatedData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/update-investor-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, ...updatedData }),
        }
      );

      if (!response.ok) {
        console.error("Failed to update profile:", response.status);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserData();
    }
  }, [username]);

  return { userData, saveUserProfile };
};

export default useUserProfile;
