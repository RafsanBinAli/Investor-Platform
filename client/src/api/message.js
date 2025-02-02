// src/api/message.js

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchMessages = async (conversationId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/message-retriving?convoID=${conversationId}`
    );
    
    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      console.log("Error fetching messages:", response.status);
      return { success: false, error: "Failed to fetch messages" };
    }
  } catch (error) {
    console.error("Error during fetch:", error);
    return { success: false, error: "Network error" };
  }
};

export const sendMessage = async (content, senderUsername, receiverUsername) => {
  try {
    console.log("Here it is coming")
    const response = await fetch(`${BASE_URL}/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        senderUsername,
        receiverUsername,
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: "Failed to send message" };
    }
  } catch (error) {
    console.error("Error sending message:", error);
    return { success: false, error: "Network error" };
  }
};