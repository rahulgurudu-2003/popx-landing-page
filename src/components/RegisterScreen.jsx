import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import FloatingInput from './FloatingInput';
import { ArrowLeft } from 'lucide-react';

const RegisterScreen = () => {
  const { registerUser, navigateBack } = useUser();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: 'Yes'
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  useEffect(() => {
    const validateForm = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10}$/;
      
      const nameValid = formData.fullName.trim().length >= 2;
      const phoneValid = phoneRegex.test(formData.phone.trim()) || formData.phone.trim().length >= 8;
      const emailValid = emailRegex.test(formData.email.trim());
      const passwordValid = formData.password.length >= 6;
      const agencyValid = !!formData.isAgency;

      setIsFormValid(nameValid && phoneValid && emailValid && passwordValid && agencyValid);
    };

    validateForm();
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) {
      tempErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      tempErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      tempErrors.phone = 'Phone number is invalid';
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    registerUser(formData);
  };

  return (
    <div className="screen-wrapper slide-in" style={{ paddingBottom: '16px' }}>
      <div className="header-bar">
        <button className="back-btn" onClick={navigateBack} aria-label="Go Back">
          <ArrowLeft size={24} />
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h1 className="screen-title with-badge" style={{ fontSize: '26px', marginBottom: '24px' }}>
          <span>Create your<br />PopX account</span>
          <span className="title-badge" style={{ alignSelf: 'flex-start', marginTop: '4px' }}>1</span>
        </h1>

        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ flex: 1 }}>
            <FloatingInput
              label="Full Name*"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              autoComplete="name"
            />

            <FloatingInput
              label="Phone number*"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              autoComplete="tel"
            />

            <FloatingInput
              label="Email address*"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />

            <FloatingInput
              label="Password*"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="new-password"
            />

            <FloatingInput
              label="Company name"
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              error={errors.companyName}
              autoComplete="organization"
            />

            <div className="radio-group-container">
              <p className="radio-group-label">Are you an Agency?*</p>
              <div className="radio-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="isAgency"
                    value="Yes"
                    checked={formData.isAgency === 'Yes'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="custom-radio">
                    <span className="custom-radio-inner"></span>
                  </span>
                  Yes
                </label>

                <label className="radio-option">
                  <input
                    type="radio"
                    name="isAgency"
                    value="No"
                    checked={formData.isAgency === 'No'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="custom-radio">
                    <span className="custom-radio-inner"></span>
                  </span>
                  No
                </label>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={!isFormValid}
            style={{ 
              backgroundColor: isFormValid ? 'var(--primary-color)' : '#CBCBCB',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              marginTop: '16px',
              padding: '14px'
            }}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
