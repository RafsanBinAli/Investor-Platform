export const fetchUserData = async (managerUsername) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/startup/home/${managerUsername}`
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
