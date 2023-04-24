import React, { ChangeEventHandler, ForwardedRef, forwardRef } from 'react'

const Input: React.FC<InputProps> = forwardRef((props, forwardedRef) => {
    const { label, name, id, value, onChange, error, ...otherProps } = props

    return (
        <div className="input-container">
            <label htmlFor={id} className="label">
                {label}
            </label>
            <input
                ref={forwardedRef}
                id={id}
                type="text"
                value={value}
                name={name}
                onChange={onChange}
                className={`input ${error ? 'error' : ''}`}
                {...otherProps}
            />

            {error && <span className="error-message">{error}</span>}
        </div>
    )
})

export default Input

interface InputProps {
    label: string
    id: string
    value: string
    name: string
    onChange: ChangeEventHandler<HTMLInputElement>
    error?: boolean
    otherProps?: any
    required: boolean
    maxLength: number
    minLength: number
    ref?: ForwardedRef<HTMLInputElement | null>
}
