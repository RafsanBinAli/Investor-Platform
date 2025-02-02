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

export const loginManager = async (username, password) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/startup/login`, {
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