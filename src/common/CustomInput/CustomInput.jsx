import React from 'react'
import './CustomInput.css'

export const CustomInput = ({ design, type, name, placeholder, functionProp, functionBlur, msgError, disabled, value }) => {
   return (
      <div>
         <input
            disabled={disabled}
            className={design}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value || undefined}
            onChange={(e) => functionProp(e)}
            onBlur={(e) => functionBlur(e)}
         />
         {msgError && <div className="error-message">{errorMessage}</div>}
      </div>
   )
}