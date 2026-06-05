import React, { useState, useEffect } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import ProfileScreen from './components/ProfileScreen';
import { Signal, Wifi, Battery } from 'lucide-react';

const AppContent = () => {
  const { currentScreen } = useUser();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const date = new Date();
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedHours = String(hours).padStart(2, '0');
      
      setTime(`${formattedHours}:${minutes} ${ampm}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'login':
        return <LoginScreen />;
      case 'register':
        return <RegisterScreen />;
      case 'forgot-password':
        return <ForgotPasswordScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  const isProfileScreen = currentScreen === 'profile';

  return (
    <div className="phone-simulator">
      <div className="phone-notch">
        <div className="phone-camera"></div>
      </div>

      <div className={`status-bar ${isProfileScreen ? 'light-theme' : ''}`} style={{ marginTop: '12px' }}>
        <span>{time || '09:41 AM'}</span>
        <div className="status-bar-icons">
          <Signal size={14} strokeWidth={2.5} />
          <Wifi size={14} strokeWidth={2.5} />
          <Battery size={16} strokeWidth={2.5} style={{ transform: 'rotate(0deg)', marginLeft: '2px' }} />
        </div>
      </div>

      <div className="app-container">
        {renderScreen()}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;
