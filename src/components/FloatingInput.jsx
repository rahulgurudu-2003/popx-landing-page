import React from 'react';

const FloatingInput = ({
  label,
  type = 'text',
  value,
  onChange,
  name,
  error,
  placeholder = ' ',
  ...props
}) => {
  return (
    <div className="input-wrapper">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="floating-input"
        style={error ? { borderColor: 'var(--error-color)' } : {}}
        {...props}
      />
      <label 
        className="floating-label" 
        style={error ? { color: 'var(--error-color)' } : {}}
      >
        {label}
      </label>
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
};

export default FloatingInput;
