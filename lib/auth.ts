export interface User {
  id: string;
  email: string;
  name: string;
}

export const login = async (email: string, password: string): Promise<User> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  // Mock successful login
  const user: User = {
    id: '1',
    email,
    name: email.split('@')[0],
  };

  // Store mock JWT token
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', 'mock-jwt-token');
    localStorage.setItem('user', JSON.stringify(user));
  }

  return user;
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('token');
  if (!token) return null;

  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;

  return !!localStorage.getItem('token');
};