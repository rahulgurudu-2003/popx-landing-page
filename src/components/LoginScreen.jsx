import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import FloatingInput from './FloatingInput';
import { ArrowLeft } from 'lucide-react';

const LoginScreen = () => {
  const { loginUser, navigateBack, navigateTo } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError('');
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  useEffect(() => {
    const validateForm = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailValid = emailRegex.test(formData.email.trim());
      const passwordValid = formData.password.length >= 6;
      setIsFormValid(emailValid && passwordValid);

      const tempErrors = {};
      if (formData.email.trim() && !emailValid) {
        tempErrors.email = 'Please enter a valid email address';
      }
      if (formData.password && !passwordValid) {
        tempErrors.password = 'Password must be at least 6 characters';
      }

      if (touched.email && !formData.email.trim()) {
        tempErrors.email = 'Email address is required';
      }
      if (touched.password && !formData.password) {
        tempErrors.password = 'Password is required';
      }

      setErrors(tempErrors);
    };

    validateForm();
  }, [formData, touched]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      const result = loginUser(formData.email.trim(), formData.password.trim());
      if (!result.success) {
        setSubmitError(result.message || 'Invalid email or password');
      }
    }
  };

  return (
    <div className="screen-wrapper slide-in">
      <div className="header-bar">
        <button className="back-btn" onClick={navigateBack} aria-label="Go Back">
          <ArrowLeft size={24} />
        </button>
      </div>

      <div style={{ flex: 1 }}>
        <h1 className="screen-title" style={{ fontSize: '26px', marginBottom: '10px' }}>
          Signin to your<br />PopX account
        </h1>
        <p className="screen-subtitle" style={{ marginBottom: '36px' }}>
          Lorem ipsum dolor sit amet,<br />consetetur sadipscing elitr,
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '8px' }}>
            <FloatingInput
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              autoComplete="email"
            />
            
            <FloatingInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              autoComplete="current-password"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '28px' }}>
            <span 
              onClick={() => navigateTo('forgot-password')} 
              style={{ 
                color: 'var(--primary-color)', 
                fontSize: '13px', 
                fontWeight: '600', 
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--primary-hover)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--primary-color)'}
            >
              Forgot Password?
            </span>
          </div>

          {submitError && (
            <div 
              style={{ 
                color: 'var(--error-color)', 
                fontSize: '13px', 
                marginBottom: '16px',
                textAlign: 'center',
                fontWeight: '500'
              }}
            >
              {submitError}
            </div>
          )}

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={!isFormValid}
            style={{ 
              backgroundColor: isFormValid ? 'var(--primary-color)' : '#CBCBCB',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              marginTop: '8px'
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
