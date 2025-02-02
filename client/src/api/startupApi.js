const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchStartupInfo = async (tinNumber) => {
  try {
    const response = await fetch(`${BASE_URL}/startup-info/${tinNumber}`);

    const data = await response.json();

    if (!response.ok) {
      console.log("error status", response.status);
      return { success: false, error: response.status };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching startup info:", error);
    return { success: false, error: error.message };
  }
};
export const fetchStartupData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all-startups`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data?.startupInfo || !Array.isArray(data.startupInfo)) {
      throw new Error("Invalid data structure or missing startupInfo");
    }
    return data.startupInfo;
  } catch (error) {
    console.error("Error fetching startup data:", error);
    return [];
  }
};

export const fetchUserStartups = async (managerUsername) => {
  try {
    const response = await fetch(
      `${BASE_URL}/startup/mystartups?username=${managerUsername}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.startups || [];
  } catch (error) {
    console.error("Failed to fetch startups:", error);
    return [];
  }
};

export const uploadStartup = async (formData, managerUsername) => {
  try {
    const response = await fetch(`${BASE_URL}/startup/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        startupManagerUsername: managerUsername,
      }),
    });

    if (!response.ok) {
      const { message } = await response.json();
      return { success: false, error: message || "Error uploading data" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error during API call:", error);
    return { success: false, error: "Network or server error" };
  }
};
