import React from 'react'

const Input = ({ label, id, value, onChange, error, ...props }: any) => {
    return (
        <div className="input-container">
            <label htmlFor={id} className="label">
                {label}
            </label>
            <input
                id={id}
                type="text"
                value={value}
                onChange={onChange}
                className={`input ${error ? 'error' : ''}`}
                {...props}
            />
            {/*on this specific flight searching instance, this component did not need to show this error message.
               but it is good to have this for future implementation.
            */}
            {error && <span className="error-message">{error}</span>}
        </div>
    )
}

export default Input
