import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import FloatingInput from './FloatingInput';
import { ArrowLeft, CheckCircle, Loader } from 'lucide-react';

const ForgotPasswordScreen = () => {
  const { navigateBack, navigateTo } = useUser();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError('Email address is required');
      return;
    } else if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="screen-wrapper slide-in">
      <div className="header-bar">
        <button 
          className="back-btn" 
          onClick={navigateBack} 
          aria-label="Go Back"
          disabled={loading}
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {!success ? (
          <>
            <h1 className="screen-title" style={{ fontSize: '26px', marginBottom: '10px' }}>
              Forgot Password
            </h1>
            <p className="screen-subtitle" style={{ marginBottom: '32px' }}>
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ flex: 1 }}>
                <FloatingInput
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  error={error}
                  disabled={loading}
                  autoComplete="email"
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading || !email.trim()}
                style={{ 
                  backgroundColor: !email.trim() ? '#CBCBCB' : 'var(--primary-color)',
                  cursor: !email.trim() || loading ? 'not-allowed' : 'pointer',
                  marginTop: '16px',
                  position: 'relative'
                }}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Sending Link...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '20px', textAlign: 'center' }}>
            <CheckCircle size={56} style={{ color: 'var(--success-color)', marginBottom: '20px' }} />
            <h1 className="screen-title" style={{ fontSize: '24px', marginBottom: '12px' }}>
              Check your email
            </h1>
            <p className="screen-subtitle" style={{ marginBottom: '32px' }}>
              We've sent a password reset link to <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{email}</span>.
            </p>
            <button 
              className="btn-primary" 
              onClick={() => navigateTo('login')}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
