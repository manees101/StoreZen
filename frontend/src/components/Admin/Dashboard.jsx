import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, ordersRes, productsRes] = await Promise.all([
          axios.get(`${server}/user/count`),
          axios.get(`${server}/order/count`),
          axios.get(`${server}/product/count`),
        ]);

        setStats({
          users: usersRes.data,
          orders: ordersRes.data,
          products: productsRes.data,
        });
      } catch (error) {
        toast.error("Failed to fetch statistics");
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl mt-2">{stats.users}</p>
        </div>
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-3xl mt-2">{stats.orders}</p>
        </div>
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-3xl mt-2">{stats.products}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
