import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userRes = await axios.get(`${server}/user/all`, { withCredentials: true });
        const sellerRes=await axios.get(`${server}/seller/all`,{withCredentials:true})
        setUsers([...userRes.data.users,...sellerRes.data.sellers]);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const deleteUser = async () => {
    try {
      if(selectedUser.role=="Seller")
      {
         await axios.delete(`${server}/seller/${selectedUser._id}`)
         setUsers(users.filter((user) => user._id !== selectedUser._id));
         toast.success("User deleted successfully");
         setShowModal(false);
         setSelectedUser(null);
         return;
      }
      await axios.delete(`${server}/user/${selectedUser._id}`, { withCredentials: true });
      setUsers(users.filter((user) => user._id !== selectedUser._id));
      toast.success("User deleted successfully");
      setShowModal(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error("Failed to delete user");
      setShowModal(false)
      setSelectedUser(null)
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{user._id}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDeleteClick(user)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <DeleteModal
          onConfirm={deleteUser}
          onCancel={() => setShowModal(false)}
          user={selectedUser}
        />
      )}
    </div>
  );
};

const DeleteModal = ({ onConfirm, onCancel, user }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete the user: {user.name}?</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
