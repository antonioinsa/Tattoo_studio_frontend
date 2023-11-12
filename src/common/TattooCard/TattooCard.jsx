
import React, { useState } from 'react';
import './TattooCard.css'

export const TattooCard = ({first_name, last_name, photo, nationality, selected, selectFunction}) => {

     const [change, setChange] = useState(true);

     const callSelectClick = () => {

        setChange(!change)

        selectFunction()

     }

     return (
        <div className={`tattooCardDesign ${!change ? selected : ''}`} onClick={callSelectClick}>
            {/* <div><img className='avatar' src={photo} alt={first_name}/></div> */}
            <div>{first_name}</div>
            <div>{last_name}</div>
            <div>{nationality}</div>
        </div>
     )
}