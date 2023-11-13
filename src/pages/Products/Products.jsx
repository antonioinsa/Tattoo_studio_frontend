
import React, { useState, useEffect } from 'react';
import { allProducts } from '../../services/apiCalls';
import "./Products.css";
import { TattooCard } from '../../common/TattooCard/TattooCard';

export const Product = () => {

    const [characters, setCharacters] = useState([]);

    useEffect(()=>{

        if(characters.length === 0){

            // setTimeout(()=>{

                allProducts()
                .then(
                    characters => {
                        console.log(characters)

                        setCharacters(characters.data.data)
                    }
                )
                .catch(error => console.log(error))

            // }, 2000)
           
        }

    },[characters]);

    const tellMe = (argumento) => {
        console.log(argumento)
    }


    return (
        <div className='productDesign'>
            {
                characters.length > 0 

                ? (
                    <div className='characterRoster'>
                        {
                            characters.map(
                                character => {
                                    return (
                                        <TattooCard 
                                            key={character.id}
                                            name={character.name}
                                            image={character.image}
                                            status={character.status}
                                            location={character.location.name}
                                            selected={"selectedCard"}
                                            selectFunction={()=>tellMe(character)}
                                        />
                                    )
                                }
                            )
                        }
                    </div>
                )

                : (
                    <div>Aún no han venido</div>
                )
            }
        </div>
    )
}