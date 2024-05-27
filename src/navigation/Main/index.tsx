import {NavigationContainer} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import AuthNavigation from '../AuthNavigation';
import React from 'react';
import {RootState} from '../../store';
import {useSelector} from 'react-redux';
import AppselectorNavigation from '../AppNavigation';

type authenticationType =
  | 'loggedIn'
  | 'loggedOut'
  | 'initializing'
  | 'unAuthenticated';

function MainNavigation() {
  // const [attemptAuth, setAttemptAuth] = useState<boolean>(true);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );

  const [userStatus, setUserStatus] =
    useState<authenticationType>('initializing');

  useEffect(() => {
    checkUser();
    // if (isAuthenticated === true) {
    //   setAttemptAuth(false);
    // } else {
    //   setAttemptAuth(false);
    // }
  }, []);

  const checkUser = async () => {
    try {
      setUserStatus('initializing');
      setTimeout(() => {
        setUserStatus('unAuthenticated');
      }, 3000);
    } catch (error) {
      setTimeout(() => {
        setUserStatus('loggedOut');
      }, 5000);
    }
  };

  console.log('userStatus', isAuthenticated);

  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthNavigation /> : <AppselectorNavigation />}
    </NavigationContainer>
  );
}

export default MainNavigation;
