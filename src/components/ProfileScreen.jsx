import React, { useRef } from 'react';
import { useUser } from '../context/UserContext';
import { Camera, LogOut } from 'lucide-react';

const ProfileScreen = () => {
  const { currentUser, logoutUser, updateAvatar } = useUser();
  const fileInputRef = useRef(null);

  const user = currentUser || {
    fullName: 'Marry Doe',
    email: 'Marry@Gmail.Com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250&h=250',
    companyName: 'PopX Studio',
    isAgency: 'Yes'
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="screen-wrapper fade-in" style={{ padding: 0, background: '#f7f7f9', display: 'flex', flexDirection: 'column' }}>

      <div
        style={{
          background: '#ffffff',
          padding: '18px 24px',
          borderBottom: '1px solid #eaeaec',
          boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>
          Account Settings
        </h2>

        <button
          onClick={logoutUser}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#ff3b30',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px',
            borderRadius: '50%',
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffeef0';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title="Logout"
          aria-label="Logout Account"
        >
          <LogOut size={20} />
        </button>
      </div>

      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        <div style={{ display: 'flex', gap: '18px', alignItems: 'center', marginBottom: '24px' }}>

          <div style={{ position: 'relative', width: '82px', height: '82px' }}>
            <img
              src={user.avatar}
              alt={user.fullName}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}
            />
            <button
              onClick={handleCameraClick}
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                backgroundColor: 'var(--primary-color)',
                border: '2px solid #ffffff',
                borderRadius: '50%',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-color)'}
              aria-label="Upload profile image"
            >
              <Camera size={12} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>

          <div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '3px' }}>
              {user.fullName}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>
              {user.email}
            </p>
          </div>
        </div>

        <p
          style={{
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#4f4f54',
            marginBottom: '28px',
            fontWeight: '400'
          }}
        >
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
        </p>

        <div style={{ borderTop: '1.5px dashed #cbcbcb', margin: '0 -24px' }}></div>

        <div style={{
          position: 'relative',
          flex: 1,
          minHeight: '120px',
          overflow: 'hidden',
          margin: '0 -24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #ffffff 0%, #f6f3ff 100%)'
        }}>
          <div style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(112,43,254,0.06) 0%, rgba(112,43,254,0) 70%)',
            top: '-20px',
            left: '-20px'
          }}></div>
          <div style={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(112,43,254,0.04) 0%, rgba(112,43,254,0) 70%)',
            bottom: '-30px',
            right: '-20px'
          }}></div>

          <div style={{ position: 'relative', width: '80px', height: '80px', zIndex: 2 }}>
            <svg width="100%" height="100%" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(112,43,254,0.08)" strokeWidth="2.5"></circle>
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="url(#purpleGradient)"
                strokeWidth="2.5"
                strokeDasharray="70 30"
                strokeDashoffset="25"
                strokeLinecap="round"
              ></circle>
              <defs>
                <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a77cff" />
                  <stop offset="100%" stopColor="#702BFE" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#702BFE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" /></svg>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1.5px dashed #cbcbcb', margin: '0 -24px 0 -24px' }}></div>

      </div>
    </div>
  );
};

export default ProfileScreen;
