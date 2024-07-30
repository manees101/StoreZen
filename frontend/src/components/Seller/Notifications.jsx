import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
const notificationData=[
    {
      id: 1,
      message: "Product Samsung Galaxy S21 has reached its stock threshold.",
      type: "inventory",
      productId: "665c63ba841559ceb2fe5951",
      date: "2024-07-24T10:00:00Z"
    },
    {
      id: 2,
      message: "Based on recent sales trends, Product iphone 13 is predicted to have high demand next month.",
      type: "prediction",
      productId: "665c6333841559ceb2fe594f",
      date: "2024-07-24T11:00:00Z"
    }
  ]

const SellerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // const res = await axios.get(`${server}/seller/notifications`, { withCredentials: true });
        // setNotifications(res.data.notifications);
        setNotifications(notificationData)
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch notifications");
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    notifications.forEach(notification => {
      toast.info(notification.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }, [notifications]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-md ${notification.type === "inventory" ? "bg-yellow-100" : "bg-blue-100"}`}
          >
            <p>{notification.message}</p>
            <p className="text-sm text-gray-500">{new Date(notification.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerNotifications;
