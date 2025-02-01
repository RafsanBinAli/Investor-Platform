export const fetchStartupData = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/all-startups`
    );
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
      `${process.env.REACT_APP_BACKEND_URL}/startup/mystartups?username=${managerUsername}`
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
