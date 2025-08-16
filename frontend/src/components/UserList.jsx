import React, { useState, useEffect } from 'react';
import '../styles/UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://registration-form-ytgz.onrender.com/api/users/users');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch users');
        }
        
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const downloadResume = async (userId) => {
    try {
      const response = await fetch(`https://registration-form-ytgz.onrender.com/api/users/resume/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to download resume');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Find the user to get the original filename
      const user = users.find(u => u._id === userId);
      link.download = user.resume?.originalName || 'resume';
      
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-list-container">
      <h2>Registered Students</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>College ID</th>
            <th>Phone</th>
            <th>Year</th>
            <th>Department</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.collegeId}</td>
              <td>{user.phone}</td>
              <td>{user.year}</td>
              <td>{user.department}</td>
              <td>
                {user.resume ? (
                  <button 
                    onClick={() => downloadResume(user._id)}
                    className="download-btn"
                  >
                    Download
                  </button>
                ) : (
                  <span>No resume</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;