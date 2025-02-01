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
  
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };
  