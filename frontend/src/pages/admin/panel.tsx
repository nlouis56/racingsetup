import 'tailwindcss/tailwind.css';
import Navbar from '@/components/Navbar';
import { User } from '@/data/user';
import { backendUrl } from '@/data/callServer';

import { useEffect, useState } from "react";
import router from 'next/router';

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([
  ]);

  const [isEditing, setIsEditing] = useState<null | number>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addedPassword, setAddedPassword] = useState("");
  const [newUser, setNewUser] = useState({ displayName: "", firstName: "", lastName: "", email: "", racingNumber: 0 });
  const [searchTerm, setSearchTerm] = useState("");

  const saveEdit = async (id: number, updatedUser: User) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const decoded = decodeBase64Payload(token);

    if (!decoded) {
      console.error('No decoded payload found');
      return;
    }

    if (!decoded.isAdmin) {
      console.error('User is not an admin');
      return;
    }

    const bodyData = {
      displayName: updatedUser.displayName,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      racingNumber: updatedUser.racingNumber,
    };

    console.log(bodyData);

    const response = await fetch(`http://${backendUrl}/api/admin/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      console.log('Failed to update user');
      console.log(response.body);
      return;
    }

    console.log('User updated successfully');
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    setIsEditing(null);
  };

  const decodeBase64Payload = (token: string) => {
    try {
      const base64Url = token.split('.')[1]; // Get the payload part
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = JSON.parse(atob(base64)); // Decode Base64 to JSON
      return decodedPayload;
    } catch (error) {
      console.error('Error decoding payload:', error);
      return null;
    }
  };

  const deleteUser = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const decoded = decodeBase64Payload(token);

    if (!decoded) {
      console.error('No decoded payload found');
      return;
    }

    if (!decoded.isAdmin) {
      console.error('User is not an admin');
      return;
    }

    if (decoded.userId === id) {
      window.alert('Cannot delete own user');
      return;
    }

    const response = await fetch(`http://${backendUrl}/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` },
    });

    if (!response.ok) {
      console.log('Failed to delete user');
      console.log(response.body);
      return;
    }

    console.log('User deleted successfully');
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAddUser = async () => {
    console.log(newUser);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const decoded = decodeBase64Payload(token);

    if (!decoded) {
      console.error('No decoded payload found');
      return;
    }

    if (!decoded.isAdmin) {
      console.error('User is not an admin');
      return;
    }

    const response = await fetch(`http://${backendUrl}/api/admin/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ defaultPassword: addedPassword, ...newUser }),
    });

    if (!response.ok) {
      console.log('Failed to add user');
      console.log(response.body);
      return;
    }

    const data = await response.json();
    console.log('User added successfully');
    console.log(data);
    getAllUsers().then((data) => setUsers(data));
    setAddedPassword("");
    setNewUser({ displayName: "", firstName: "", lastName: "", email: "", racingNumber: 0 });
    setIsAdding(false);
  };

  const getAllUsers = async () => {
    const response = await fetch(`http://${backendUrl}/api/admin/users`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` },
    });

    if (!response.ok) {
      console.log('Failed to fetch users');
      console.log(response.body);
      router.push('/dashboard');
    }

    const data = await response.json();
    console.log('Users fetched successfully');
    console.log(data);
    return data;
  }

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    [user.id.toString(), user.displayName.toLowerCase(), user.email.toLowerCase(), (user.racingNumber ?? '').toString()]
      .some((field) => field.includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      router.push('/login');
      return;
    }

    const decoded = decodeBase64Payload(token);
    console.log('Decoded:', decoded);
    try {
      getAllUsers().then((data) => setUsers(data));
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }, []);

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Navbar Component Placeholder */}
        <Navbar />
        <div className="p-6 flex-1">
          <h2 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h2>

          {/* Add User Button */}
          <button
            onClick={() => setIsAdding(true)}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add User
          </button>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by ID, Name, Email, or Racing Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />

          {/* Users Section */}
          <div className="bg-white p-4 rounded shadow">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="text-left p-2 border">ID</th>
                  <th className="text-left p-2 border">Username</th>
                  <th className="text-left p-2 border">First name</th>
                  <th className="text-left p-2 border">Last name</th>
                  <th className="text-left p-2 border">Email</th>
                  <th className="text-left p-2 border">Racing Number</th>
                  <th className="text-left p-2 border">Role</th>
                  <th className="text-left p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="p-2 border">{user.id}</td>
                    <td className="p-2 border">
                      {isEditing === user.id ? (
                        <input
                          className="border p-1"
                          type="text"
                          value={user.displayName}
                          onChange={(e) =>
                            setUsers(
                              users.map((u) =>
                                u.id === user.id ? { ...u, displayName: e.target.value } : u
                              )
                            )
                          }
                        />
                      ) : (
                        user.displayName
                      )}
                    </td>
                    <td className="p-2 border">
                      {isEditing === user.id ? (
                        <input
                          className="border p-1"
                          type="text"
                          value={user.firstName}
                          onChange={(e) =>
                            setUsers(
                              users.map((u) =>
                                u.id === user.id ? { ...u, firstName: e.target.value } : u
                              )
                            )
                          }
                        />
                      ) : (
                        user.firstName
                      )}
                    </td>
                    <td className="p-2 border">
                      {isEditing === user.id ? (
                        <input
                          className="border p-1"
                          type="text"
                          value={user.lastName}
                          onChange={(e) =>
                            setUsers(
                              users.map((u) =>
                                u.id === user.id ? { ...u, lastName: e.target.value } : u
                              )
                            )
                          }
                        />
                      ) : (
                        user.lastName
                      )}
                    </td>
                    <td className="p-2 border">
                      {isEditing === user.id ? (
                        <input
                          className="border p-1"
                          type="text"
                          value={user.email}
                          onChange={(e) =>
                            setUsers(
                              users.map((u) =>
                                u.id === user.id ? { ...u, email: e.target.value } : u
                              )
                            )
                          }
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="p-2 border">
                      {isEditing === user.id ? (
                        <input
                          className="border p-1"
                          type="text"
                          value={(user.racingNumber ?? '').toString()}
                          onChange={(e) =>
                            setUsers(
                              users.map((u) =>
                                u.id === user.id ? { ...u, racingNumber: parseInt(e.target.value) } : u
                              )
                            )
                          }
                        />
                      ) : (
                        user.racingNumber
                      )}
                    </td>
                    <td className="p-2 border">
                      { user.isAdmin ? "Admin" : "User" }
                    </td>
                    <td className="p-2 border flex gap-2">
                      {isEditing === user.id ? (
                        <button
                          onClick={() => saveEdit(user.id, user)}
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsEditing(user.id)}
                          className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-xl font-bold mb-4">Add User</h3>
            <input
              type="text"
              placeholder="Username"
              value={newUser.displayName}
              onChange={(e) => setNewUser({ ...newUser, displayName: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="First Name"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Racing Number"
              value={newUser.racingNumber}
              onChange={(e) => setNewUser({ ...newUser, racingNumber: parseInt(e.target.value) })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={addedPassword}
              onChange={(e) => setAddedPassword(e.target.value) }
              className="w-full mb-2 p-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
              <button
                onClick={() =>  {
                  setNewUser({ displayName: "", firstName: "", lastName: "", email: "", racingNumber: 0 });
                  setAddedPassword("");
                  setIsAdding(false)
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

