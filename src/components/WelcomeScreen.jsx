import React from 'react';
import { useUser } from '../context/UserContext';

const WelcomeScreen = () => {
  const { navigateTo } = useUser();

  return (
    <div className="screen-wrapper fade-in" style={{ justifyContent: 'flex-end', minHeight: '100%' }}>
      <div style={{ flex: 1 }}></div>

      <div style={{ marginBottom: '40px' }}>
        <h1 className="screen-title" style={{ fontSize: '28px', marginBottom: '12px' }}>
          Welcome to PopX
        </h1>
        <p className="screen-subtitle" style={{ fontSize: '15px', marginBottom: '32px', maxWidth: '280px' }}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            className="btn-primary" 
            onClick={() => navigateTo('register')}
          >
            Create Account
          </button>
          
          <button 
            className="btn-secondary" 
            style={{ 
              backgroundColor: '#DDD3FD', 
              color: '#1d1d1f',
              fontSize: '15px'
            }} 
            onClick={() => navigateTo('login')}
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
