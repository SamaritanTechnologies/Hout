import React from 'react';

const ToggleSwitch = ({ 
  checked, 
  onChange, 
  label, 
  disabled = false,
  size = 'md' // 'sm', 'md', 'lg'
}) => {
  const sizeClasses = {
    sm: {
      switch: 'w-10 h-5',
      circle: 'w-4 h-4',
      translate: 'translate-x-5'
    },
    md: {
      switch: 'w-12 h-6',
      circle: 'w-5 h-5',
      translate: 'translate-x-6'
    },
    lg: {
      switch: 'w-16 h-8',
      circle: 'w-7 h-7',
      translate: 'translate-x-8'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className={`
          ${currentSize.switch}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}
          relative inline-flex items-center rounded-full transition-all duration-300 ease-in-out 
          focus:outline-none focus:ring-4 focus:ring-opacity-50
          shadow-md border
        `}
        style={{
          background: checked 
            ? 'linear-gradient(to right, #4ade80, #16a34a)' 
            : 'linear-gradient(to right, #e5e7eb, #d1d5db)',
          borderColor: checked ? '#16a34a20' : '#d1d5db20',
          boxShadow: checked 
            ? '0 4px 6px -1px rgba(34, 197, 94, 0.2), 0 2px 4px -1px rgba(34, 197, 94, 0.1)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
      >
        <span
          className={`
            ${currentSize.circle}
            ${checked ? currentSize.translate : 'translate-x-0.5'}
            inline-block transform rounded-full transition-all duration-300 ease-in-out
            border-2
          `}
          style={{
            backgroundColor: '#ffffff',
            borderColor: 'rgba(255, 255, 255, 0.5)',
            boxShadow: checked 
              ? '0 10px 15px -3px rgba(34, 197, 94, 0.3), 0 4px 6px -2px rgba(34, 197, 94, 0.2)' 
              : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Inner glow effect */}
          <span 
            className="absolute inset-0 rounded-full transition-all duration-300"
            style={{
              background: checked 
                ? 'linear-gradient(to bottom right, rgba(34, 197, 94, 0.1), transparent)' 
                : 'linear-gradient(to bottom right, rgba(156, 163, 175, 0.1), transparent)',
              opacity: checked ? 0.6 : 0.4
            }}
          />
        </span>
        
        {/* Active indicator dot */}
        {checked && (
          <span 
            className="absolute left-1 top-1/2 transform -translate-y-1/2 w-1 h-1 rounded-full animate-pulse"
            style={{
              backgroundColor: '#86efac',
              width: '4px',
              height: '4px'
            }}
          />
        )}
      </button>
      
      {label && (
        <div className="flex flex-col">
          <span 
            className="text-sm font-semibold transition-colors duration-200"
            style={{
              color: disabled 
                ? '#9ca3af' 
                : checked 
                  ? '#15803d' 
                  : '#4b5563'
            }}
          >
            {label}
          </span>
          <span 
            className="text-xs transition-colors duration-200"
            style={{
              color: disabled 
                ? '#d1d5db' 
                : checked 
                  ? '#22c55e' 
                  : '#9ca3af'
            }}
          >
            {checked ? 'Visible to customers' : 'Hidden from customers'}
          </span>
        </div>
      )}
    </div>
  );
};

export default ToggleSwitch;