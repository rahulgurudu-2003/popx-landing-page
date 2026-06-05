import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import FloatingInput from './FloatingInput';
import { ArrowLeft } from 'lucide-react';

const detectGender = (fullName) => {
  if (!fullName) return 'Male';
  const parts = fullName.trim().toLowerCase().split(/\s+/);
  const firstName = parts[0] || '';
  
  const maleNames = new Set([
    'hari', 'krishna', 'ravi', 'ali', 'pooran', 'kumar', 'amit', 'rahul', 'anil', 
    'sunil', 'vijay', 'sanjay', 'john', 'david', 'peter', 'alex', 'michael', 
    'robert', 'james', 'william', 'joseph', 'charles', 'thomas', 'daniel', 
    'matthew', 'anthony', 'mark', 'donald', 'steven', 'paul', 'andrew'
  ]);
  
  const femaleNames = new Set([
    'marry', 'mary', 'shanti', 'laxmi', 'anita', 'kiran', 'pooja', 'neha', 
    'divya', 'priya', 'sita', 'geeta', 'geetha', 'deepika', 'catherine', 
    'elizabeth', 'sarah', 'jessica', 'patricia', 'jennifer', 'linda', 
    'barbara', 'margaret', 'susan', 'dorothy', 'lisa', 'nancy', 'karen', 
    'betty', 'helen', 'sandra', 'donna', 'carol', 'ruth', 'sharon'
  ]);
  
  if (maleNames.has(firstName)) {
    return 'Male';
  }
  if (femaleNames.has(firstName)) {
    return 'Female';
  }
  
  const lastChar = firstName.slice(-1);
  const lastTwo = firstName.slice(-2);
  
  if (
    lastChar === 'a' || 
    lastChar === 'i' || 
    lastChar === 'y' ||
    lastTwo === 'ie' ||
    lastTwo === 'ha'
  ) {
    return 'Female';
  }
  
  return 'Male';
};

const RegisterScreen = () => {
  const { registerUser, navigateBack } = useUser();
  const [femaleAvatars, setFemaleAvatars] = useState([]);

  useEffect(() => {
    const pool = [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=150&h=150',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150&h=150'
    ];
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setFemaleAvatars(shuffled.slice(0, 3));
  }, []);

  const maleAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150'
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: 'Yes',
    gender: 'Male',
    avatar: ''
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touched, setTouched] = useState({});

  const currentAvatars = formData.gender === 'Male' ? maleAvatars : femaleAvatars;

  useEffect(() => {
    if (!formData.fullName.trim()) {
      setFormData(prev => ({
        ...prev,
        gender: 'Male',
        avatar: ''
      }));
      return;
    }

    const detected = detectGender(formData.fullName);
    if (detected !== formData.gender || !formData.avatar) {
      const defaultAvatar = detected === 'Male' 
        ? maleAvatars[0] 
        : (femaleAvatars[0] || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150');
      setFormData(prev => ({
        ...prev,
        gender: detected,
        avatar: defaultAvatar
      }));
    }
  }, [formData.fullName, femaleAvatars]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  useEffect(() => {
    const validateForm = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      const nameValid = formData.fullName.trim().length >= 2;
      const phoneValid = formData.phone.trim().length >= 8;
      const emailValid = emailRegex.test(formData.email.trim());
      const passwordValid = formData.password.length >= 6;
      const agencyValid = !!formData.isAgency;
      const avatarValid = !!formData.avatar;

      setIsFormValid(nameValid && phoneValid && emailValid && passwordValid && agencyValid && avatarValid);

      const tempErrors = {};

      if (formData.fullName.trim() && !nameValid) {
        tempErrors.fullName = 'Name must be at least 2 characters';
      }
      if (formData.phone.trim() && !phoneValid) {
        tempErrors.phone = 'Phone number must be at least 8 digits';
      }
      if (formData.email.trim() && !emailValid) {
        tempErrors.email = 'Please enter a valid email address';
      }
      if (formData.password && !passwordValid) {
        tempErrors.password = 'Password must be at least 6 characters';
      }

      if (touched.fullName && !formData.fullName.trim()) {
        tempErrors.fullName = 'Full Name is required';
      }
      if (touched.phone && !formData.phone.trim()) {
        tempErrors.phone = 'Phone number is required';
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
      registerUser(formData);
    }
  };

  return (
    <div className="screen-wrapper slide-in" style={{ padding: '16px 20px 24px 20px' }}>
      <div className="header-bar" style={{ marginBottom: '8px' }}>
        <button className="back-btn" onClick={navigateBack} aria-label="Go Back" style={{ padding: '4px 8px 4px 0' }}>
          <ArrowLeft size={22} />
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h1 className="screen-title" style={{ fontSize: '22px', marginBottom: '14px', marginTop: '4px' }}>
          Create your<br />PopX account
        </h1>

        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ flex: 1 }}>
            <FloatingInput
              label="Full Name*"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.fullName}
              autoComplete="name"
            />

            <FloatingInput
              label="Phone number*"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              autoComplete="tel"
            />

            <FloatingInput
              label="Email address*"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              autoComplete="email"
            />

            <FloatingInput
              label="Password*"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              autoComplete="new-password"
            />

            <FloatingInput
              label="Company name"
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.companyName}
              autoComplete="organization"
            />

            <div className="radio-group-container" style={{ marginTop: '12px', marginBottom: '8px' }}>
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


            {formData.fullName.trim().length > 0 && (
              <div style={{ marginTop: '12px', marginBottom: '8px' }}>
                <p className="radio-group-label">Choose your Avatar*</p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                  {currentAvatars.map((url, index) => {
                    const isSelected = formData.avatar === url;
                    return (
                      <div
                        key={index}
                        onClick={() => setFormData(prev => ({ ...prev, avatar: url }))}
                        style={{
                          position: 'relative',
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          border: isSelected ? '3px solid var(--primary-color)' : '2px solid transparent',
                          boxShadow: isSelected ? '0 0 8px rgba(98, 44, 237, 0.4)' : 'none',
                          overflow: 'hidden'
                        }}
                      >
                        <img
                          src={url}
                          alt={`Avatar ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={!isFormValid}
            style={{ 
              backgroundColor: isFormValid ? 'var(--primary-color)' : '#CBCBCB',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              marginTop: '8px',
              padding: '12px'
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
