// src/api/meeting.js
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const setMeeting = async (username, meetingData) => {
  try {
    const response = await fetch(
      `${BASE_URL}/set-meeting/${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meetingData),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        message: data.message
      };
    }

    return {
      success: true,
      data
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error"
    };
  }
};

export const getManagerName = async (tinNumber) => {
  try {
    const response = await fetch(
      `${BASE_URL}/get-managerName?tinNumber=${tinNumber}`
    );
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message: "Error finding manager name"
    };
  }
};