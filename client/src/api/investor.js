export const loginUser = async (username, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: username,
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
  
  export const registerUser = async (formData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`Server returned an error: ${response.status}`);
      }
  
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: error.message };
    }
  };


export const fetchUserData = async (username) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/investor-profile?username=${username}`
    );
    const data = await response.json();
    return data.investor;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null; // or throw an error based on your needs
  }
};

export const saveUserProfile = async (username, userData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/update-investor-profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, ...userData }),
      }
    );
    if (!response.ok) {
      console.error("Failed to update profile:", response.status);
      throw new Error("Failed to update profile");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
