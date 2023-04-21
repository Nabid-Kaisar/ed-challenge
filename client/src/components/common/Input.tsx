import React from 'react'

const Input = ({ label, value, onChange, error, ...props }: any) => {
    return (
        <div className="input-container">
            <label htmlFor={label} className="label">
                {label}
            </label>
            <input
                id={label}
                type="text"
                value={value}
                onChange={onChange}
                className={`input ${error ? 'error' : ''}`}
                {...props}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    )
}

export default Input
