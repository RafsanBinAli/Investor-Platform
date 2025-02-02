import { useEffect, useState } from "react";
import { fetchNotifications } from "../../api/notification";
import { formatDate, formatTime } from "../../utils/dateFormatters";
import { IMAGES } from "../../constants/images";
import "./NotificationView.css";

const NotificationView = () => {
  const [notifications, setNotifications] = useState([]);
  const managerUsername = localStorage.getItem("username");

  useEffect(() => {
    const loadNotifications = async () => {
      const result = await fetchNotifications(managerUsername);
      if (result.success) {
        setNotifications(result.data);
      } else {
        console.error("Failed to load notifications:", result.error);
      }
    };

    loadNotifications();
  }, [managerUsername]);

  const renderNotificationContent = (notification) => {
    if (notification.about === "message") {
      return (
        <p>
          <b>{notification.investorUsername}</b> started a chat with you
        </p>
      );
    }

    return (
      <>
        <p>
          <b>{notification.investorUsername}</b> has fixed a meeting with you
        </p>
        <p>
          Date: {formatDate(notification.meetingTime)}
          <br />
          Time: {formatTime(notification.meetingTime)}
        </p>
      </>
    );
  };

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
                    <img
                      src={
                        notification.about === "message"
                          ? IMAGES.MESSAGE
                          : IMAGES.MEETING
                      }
                      alt="notification icon"
                    />
                  </div>
                  <div className="notification-list_detail">
                    {renderNotificationContent(notification)}
                  </div>
                </div>
                <div className="notification-list_feature-img"></div>
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
