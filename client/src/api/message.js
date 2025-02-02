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

export const sendMessage = async (content, receiverUsername) => {
  try {
    const authToken = localStorage.getItem("auth_token");
    const response = await fetch(`${BASE_URL}/conversation/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({
        content,
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

export const getConversations = async (username) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/conversation/all?username=${username}`
    );

    if (response.ok) {
      const data = await response.json();

      // Extract relevant conversation details
      const conversations = data.conversations.map((conversation) => {
        // Get the other party's username (i.e., not the current user's username)
        const otherParty = conversation.investorUsername === username 
          ? conversation.startupManagerUsername 
          : conversation.investorUsername;

        // You can now return the conversation ID and the other party's name (username)
        return {
          id: conversation.id,
          name: otherParty
        };
      });

      // Return the data with the conversations containing ids and names
      return { success: true, data: conversations };
    } else if (response.status === 404) {
      // If no conversations are found, return an empty array
      return { success: true, data: [] }; // No conversations found
    } else {
      const errorData = await response.text();
      return { success: false, error: errorData }; // Handle other errors
    }
  } catch (error) {
    console.error("Error in fetching conversations:", error);
    return { success: false, error: error.message };
  }
};






export const createConversation = async (partnerName) => {
  try {
    const authToken = localStorage.getItem("auth_token");  
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/conversation/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}` // Add the token if needed
      },
      body: JSON.stringify({ messagingPartner: partnerName }),
    });
    

    if (!response.ok) {
      throw new Error(`Server returned an error: ${response.status}`);
    }

    return await response.json(); 
  } catch (error) {
    console.log("Error fetching conversation data:", error);
  }
};



