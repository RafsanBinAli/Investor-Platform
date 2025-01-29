import React, { useContext, useEffect, useState } from "react";
import "./NotificationView.css";
import UserContext from "../../contexts/userContext";
import Message from "./message.png";
import Meeting from "./meeting.png";
const NotificationView = () => {
  const [notifications, setnotifications] = useState([]);
  const { managerUsername } = useContext(UserContext);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `http://localhost:4000/startup/get-notifications?username=${managerUsername}`
        );
        const data = await response.json();
        setnotifications(data.notification);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [managerUsername]);
  function formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString();
  }

  function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString();
  }

  return (
    <section className="section-50">
      <div className="container">
        <h3 className="m-b-50 heading-line">
          Notifications <i className="fa fa-bell text-muted"></i>
        </h3>

        <div className="notification-ui_dd-content">
          {Array.isArray(notifications) && notifications.length > 0 ? (
            notifications.reverse().map((notification) => (
              <div
                className="notification-list notification-list--unread"
                key={notification.id}
              >
                <div className="notification-list_content">
                  <div className="notification-list_img">
                    {notification.about === "message" ? (
                      <img src={Message} alt="user" />
                    ) : (
                      <img src={Meeting} alt="user" />
                    )}
                  </div>
                  <div className="notification-list_detail">
                    {notification.about === "message" ? (
                      <p>
                        <b>{notification.investorUsername}</b> started a chat
                        with you
                      </p>
                    ) : (
                      <>
                        <p>
                          <b>{notification.investorUsername}</b> has fixed a
                          meeting with you
                        </p>
                        <p>
                          Date: {formatDate(notification.meetingTime)}
                          <br />
                          Time: {formatTime(notification.meetingTime)}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="notification-list_feature-img">
                  {/* <img src={notification.featureImage} alt="Feature image" /> */}
                </div>
              </div>
            ))
          ) : (
            <p>No notifications available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NotificationView;
