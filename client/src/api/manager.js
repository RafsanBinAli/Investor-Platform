// src/api/managerProfile.js
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchUserData = async (managerUsername) => {
  try {
    const response = await fetch(
      `${BASE_URL}/startup/home/${managerUsername}`
    );
    if (!response.ok) {
      console.log("Error:", response.status);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
    return null;
  }
};

export const loginManager = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/startup/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned an error: ${response.status}`);
    }
    const data = await response.json();

    return { success: true, token: data.token };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: error.message };
  }
};


export const fetchManagerProfile = async (username) => {
  try {
    const response = await fetch(
      `${BASE_URL}/startup/manager-profile?username=${username}`
    );
    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.message };
    }
    
    return { success: true, data: data.startupManager };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { success: false, error: "Network error" };
  }
};

export const updateManagerProfile = async (username, profileData) => {
  try {
    const response = await fetch(
      `${BASE_URL}/update-investor-profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ managerUsername: username, ...profileData }),
      }
    );

    if (!response.ok) {
      return { success: false, error: "Failed to update profile" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Network error" };
  }
};


export const registerManager = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/startup/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error registering manager:", error.message);
    return { success: false, error: error.message };
  }
};