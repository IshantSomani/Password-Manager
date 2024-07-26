import React from 'react';

const Input = ({ type, name, value, onChange, disabled, placeholder, icon, rightIcon }) => {
    const handleInputChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
                {name}
            </label>
            <div className="relative rounded-md shadow-sm">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value || ""}
                    onChange={handleInputChange}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`
                        block w-full rounded-md
                        bg-gray-700 border-gray-600 
                        placeholder-gray-400 text-white
                        focus:ring-blue-500 focus:border-blue-500 
                        sm:text-sm
                        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                        ${icon ? 'pl-10' : 'pl-3'}
                        ${rightIcon ? 'pr-10' : 'pr-3'}
                        py-2
                    `}
                />
                {rightIcon && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        {rightIcon}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;