import React from 'react'
import './CustomInput.css'

export const CustomInput = ({design, type, name, placeholder, functionProp, functionBlur, msgError}) => {
     return (
        <div>
         <input 
            className={design}
            type={type}
            name={name}
            placeholder={placeholder}
            // value={}
            onChange={(e)=>functionProp(e)}
            onBlur={(e)=>functionBlur(e)}
         />
         {msgError && <div className="error-message">{errorMessage}</div>}
         </div>
     )
}