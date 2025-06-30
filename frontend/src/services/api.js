const API_BASE = 'http://localhost:5000/api';

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Registration failed');
  }
  
  return await response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${API_BASE}/users/users`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch users');
  }
  
  return await response.json();
};