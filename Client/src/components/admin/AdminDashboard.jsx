import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAdmin ,setAdmin} from '../../redux/slices/adminSlice';
import axios from '../../../constants/axios';

function AdminDashboard() {
  const adminDetails = useSelector((state) => state?.admin?.adminDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [userList, setUserList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    
    const fetchUserList = async () => {
     
      try {
        console.log("This is user details");
        
        const response = await axios.get('/admin/getUserList',{
          role:'admin'
        });
        if (response.status === 201) {
          setUserList(response.data.user);
          setFilteredList(response.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
   
      fetchUserList();
    
    
  }, []);

  const handleLogout = () => {
    dispatch(clearAdmin());
    navigate('/admin/login');
  };

  const searchInput = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === '') {
      setFilteredList(userList);
    } else {
      setFilteredList(userList.filter((user) => user.name.toLowerCase().includes(term)));
    }
  };

  const handleDelete = (userId) => {
    // Open delete modal and set selected user
    setSelectedUser(userId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/admin/deleteUser/${selectedUser}`);
      setUserList(userList.filter((user) => user._id !== selectedUser));
      setFilteredList(filteredList.filter((user) => user._id !== selectedUser));
      setShowDeleteModal(false); // Close modal after deletion
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (user) => {
  
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const saveEdit = async () => {

    const trimmedName = selectedUser.name.trim();
    const trimmedEmail = selectedUser.email.trim();
  
    if (trimmedName === "" || trimmedEmail === "") {

      console.error("Name and email cannot be empty or contain only spaces.");
      return; 
    }
  
    try {
     
      const response = await axios.put(`/admin/edit-user/${selectedUser._id}`, {
        name: trimmedName, 
        email: trimmedEmail,
      });
  
      if (response.status === 200) {
      
        setUserList(userList.map(user => 
          user._id === selectedUser._id ? { ...user, name: trimmedName, email: trimmedEmail } : user
        ));
        setFilteredList(filteredList.map(user => 
          user._id === selectedUser._id ? { ...user, name: trimmedName, email: trimmedEmail } : user
        ));
  
        
      }
    } catch (error) {
      console.error("Error updating user: ", error);
      
    }
  
    setShowEditModal(false); 
  };
  

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      {/* Admin Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2">{adminDetails?.name}</p>
          <img className="h-16 w-16 rounded-full mt-2" src={`http://localhost:4545${adminDetails?.image}`} alt="Admin" />
        </div>
        <div>
        <button onClick={()=>navigate('/admin/addUser')} className="bg-blue-700 text-white px-4 py-2 rounded">
                    Add User
         </button>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">
          Logout
        </button>
        </div>
        
        
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search User"
          value={searchTerm}
          onChange={searchInput}
          className="bg-gray-800 text-white w-full p-2 rounded border border-gray-700"
        />
      </div>

      {/* Users List */}
      <div className="bg-gray-800 p-4 rounded">
        <h2 className="text-2xl font-bold mb-4">Users List</h2>
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Profile</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((user, index) => (
              <tr key={user._id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <img className="h-10 w-10 rounded-full" src={`http://localhost:4545/images/${user.image}`} alt="Profile" />
                </td>
                <td className="px-4 py-2 flex gap-4">
                  <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-black px-3 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user._id)} className="bg-red-600 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded text-center">
            <p className="text-lg">Are you sure you want to delete this user?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={confirmDelete} className="bg-red-600 text-white px-4 py-2 rounded">
                Confirm
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded text-center">
            <h2 className="text-xl mb-4">Edit User</h2>
            <input
              type="text"
              value={selectedUser.name}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              className="bg-gray-900 text-white w-full p-2 mb-4 rounded"
            />
            <input
              type="email"
              value={selectedUser.email}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              className="bg-gray-900 text-white w-full p-2 mb-4 rounded"
            />
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={saveEdit} className="bg-yellow-500 text-black px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setShowEditModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
