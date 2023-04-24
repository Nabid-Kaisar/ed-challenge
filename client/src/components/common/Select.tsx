import React from 'react'

const Select = ({ options, onChange, value, error }: any) => {
    return (
        <div style={{ display: 'grid' }}>
            <div className="input-container select-container">
                <select
                    id="select-box"
                    className={`select-box input ${error ? 'error' : ''}`}
                    value={value}
                    onChange={onChange}
                >
                    {options.map((option: any) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    )
}

export default Select
