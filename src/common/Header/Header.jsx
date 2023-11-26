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



  return (

    <div className='headerDesign'>
      <LinkButton
        path={'/'}
        title={'Home'}
      />
      <LinkButton
        path={'/tattooArtist'}
        title={'Tattoo Artist'} />

      {rdxCredentials?.credentials ? (
        <>
          {location.pathname !== '/worker' && location.pathname !== '/administration' && (
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
    </div>
  );
};