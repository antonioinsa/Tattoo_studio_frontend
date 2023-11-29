import React from 'react';
import './Header.css';
import { LinkButton } from '../LinkButton/LinkButton';
import { useSelector, useDispatch } from 'react-redux';
import { logout, userData } from '../../pages/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const rdxCredentials = useSelector(userData);

  const logOutMe = () => {
    dispatch(logout({ credentials: '', role: '' }));
    navigate('/');
  };

  const profile = () => {
    navigate('/profile');
  };

  const appointment = () => {
    navigate('/newappointment');
  };



  return (
    <div className='headerDesign'>
      <>
        {location.pathname !== '/worker' &&
          location.pathname !== '/administration' &&
          location.pathname !== '/allclients' &&
          location.pathname !== '/allappointments' && (
            <div>
              <LinkButton path={'/'} title={'Home'} />
            </div>
          )}
        {location.pathname !== '/worker' &&
          location.pathname !== '/administration' &&
          location.pathname !== '/allclients' &&
          location.pathname !== '/allappointments' && (
            <div>
              <LinkButton path={'/tattooArtist'} title={'Tattoo Artist'} />
            </div>
          )}
      </>

      {rdxCredentials?.credentials ? (
        <>
          {location.pathname !== '/worker' &&
            location.pathname !== '/administration' &&
            location.pathname !== '/allclients' &&
            location.pathname !== '/allappointments' && (
              <div onClick={appointment}>
                <LinkButton path={'/newappointment'} title={'New Appointment'} />
              </div>
            )}
          {location.pathname !== '/worker' &&
            location.pathname !== '/administration' &&
            location.pathname !== '/allclients' &&
            location.pathname !== '/allappointments' && (
              <div onClick={profile}>
                <LinkButton path={'/profile'} title={'Account'} />
              </div>
            )}

          <div onClick={logOutMe}>
            <LinkButton path={'/'} title={'Log out'} />
          </div>
        </>
      ) : (
        <LinkButton path={'/login'} title={'Login/Register'} />
      )}
    </div >
  );
};