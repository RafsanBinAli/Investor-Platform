// src/api/notifications.js
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchNotifications = async (username) => {
  try {
    const response = await fetch(
      `${BASE_URL}/startup/get-notifications?username=${username}`
    );
    const data = await response.json();
    return { success: true, data: data.notification };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return { success: false, error: error.message };
  }
};