import React, { useState, useEffect } from 'react';
import { TattooArtistList } from '../../services/apiCalls';
import "./TattooArtist.css";
import { TattooCard } from '../../common/TattooCard/TattooCard';
import { LoaderBar } from '../../common/Loader/Loader';
import { NavLink } from 'react-router-dom';

export const TattooArtist = () => {

    const [TattooArtists, setTattooArtists] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (!datosRdxUser.credentials) {
            navigate("/")
        }
    }, [datosRdxUser])

    useEffect(() => {

        if (TattooArtists.length === 0) {
            TattooArtistList()
                .then(response => {
                    setTattooArtists(response.data.data)
                    setLoading(false)
                }
                )
                .catch(error => {
                    console.log(error)
                    console.error("Error fetching tattoo artists", error)
                    setLoading(false)
                })
        }

    }, [TattooArtistList])


    const tellMe = (argumento) => {
        console.log(argumento)
    }


    return (
        <div className='tattooArtistDesign'>
            {

                TattooArtists.length > 0

                    ? (
                        <div className='workerRoster'>
                            {
                                TattooArtists.map(
                                    (tattooArtist) => (
                                        <NavLink key={tattooArtist.id} to={'/products'}>
                                            <TattooCard
                                                photo={tattooArtist.photo}
                                                first_name={tattooArtist.first_name}
                                                last_name={tattooArtist.last_name}
                                                nationality={tattooArtist.nationality}
                                                selectFunction={() => tellMe(tattooArtist)}
                                            />
                                        </NavLink>
                                    )

                                )
                            }
                        </div>
                    )

                    : (<div className='waiting'>Loading<LoaderBar /></div>
                    )
            }
        </div>
    );
};