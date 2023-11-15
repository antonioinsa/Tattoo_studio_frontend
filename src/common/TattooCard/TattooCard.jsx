import React, { useState } from 'react';
import './TattooCard.css'

export const TattooCard = ({ first_name, last_name, photo, nationality, selected, selectFunction, name }) => {

     const [change, setChange] = useState(true);

     const callSelectClick = () => {

        setChange(!change)

        selectFunction()

     }

     return (
        <div className={`tattooCardDesign ${!change ? selected : ''}`} onClick={callSelectClick}>
            <div><img className='avatar' src={photo} alt={name}/></div>
            <div className='text'>{first_name}</div>
            <div className='text'>{last_name}</div>
            <div className='text'>- {nationality} -</div>
        </div>
     )
}