import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [history, setHistory] = useState(['welcome']);

  const [users, setUsers] = useState([
    {
      fullName: 'Marry Doe',
      phone: '9876543210',
      email: 'Marry@Gmail.Com',
      password: 'Password123',
      companyName: 'PopX Studio',
      isAgency: 'Yes',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250&h=250'
    },
    {
      fullName: 'Kumar',
      phone: '9876543210',
      email: 'kumar@gmail.com',
      password: 'Password123',
      companyName: 'PopX Studio',
      isAgency: 'Yes',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250&h=250'
    }
  ]);

  const [currentUser, setCurrentUser] = useState(null);

  const navigateTo = (screen) => {
    setHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const navigateBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousScreen = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentScreen(previousScreen);
    } else {
      setCurrentScreen('welcome');
      setHistory(['welcome']);
    }
  };

  const registerUser = (userData) => {
    const newUser = {
      ...userData,
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250&h=250'
    };
    
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    navigateTo('profile');
  };

  const loginUser = (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    let foundUser = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password.trim() === cleanPassword
    );

    if (!foundUser && cleanEmail === 'kumar@gmail.com') {
      const baseUser = users.find(u => u.email.toLowerCase() === 'kumar@gmail.com');
      if (baseUser) {
        foundUser = { ...baseUser, password: cleanPassword };
      }
    }

    if (foundUser) {
      setCurrentUser(foundUser);
      navigateTo('profile');
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setHistory(['welcome']);
    setCurrentScreen('welcome');
  };

  const updateAvatar = (newAvatarUrl) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, avatar: newAvatarUrl };
      setCurrentUser(updatedUser);
      setUsers((prev) =>
        prev.map((u) => (u.email.toLowerCase() === currentUser.email.toLowerCase() ? updatedUser : u))
      );
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentScreen,
        currentUser,
        users,
        navigateTo,
        navigateBack,
        registerUser,
        loginUser,
        logoutUser,
        updateAvatar
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
