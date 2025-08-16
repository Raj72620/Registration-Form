const API_BASE = 'https://registration-form-ytgz.onrender.com/api';

export const registerUser = async (formData) => {
  const response = await fetch(`${API_BASE}/users/register`, {
    method: 'POST',
    body: formData, // Note: No Content-Type header for FormData
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

export const downloadResume = async (userId) => {
  const response = await fetch(`${API_BASE}/users/resume/${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to download resume');
  }
  
  return await response.blob();
};