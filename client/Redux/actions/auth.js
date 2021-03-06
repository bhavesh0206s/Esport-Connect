import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_MYPROFILE,
  CLEAR_EVENTS,
  CLEAR_PROFILES,
  CLEARGLOBALPOSTS,
} from './types';
import axios from 'axios';
import setAuthToken from '../setAuthToken';
import { AsyncStorage } from 'react-native';
import { ipAddress } from '../ipaddress';
import { createProfile, getCurrentProfile } from './profile';
import { setAlert } from './alert';
import { loading } from './loading';

//  Load User
export const loadUser = () => async (dispatch) => {
  // set header
  const token = await AsyncStorage.getItem('token');
  if (token !== null) {
    setAuthToken(token);
    console.log('token set successfull');
  } else {
    console.log('notoken');
  }

  try {
    const res = await axios.get(`http://${ipAddress}:3000/api/login`);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const register = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post(
      `http://${ipAddress}:3000/api/signup`,
      body,
      config
    );

    console.log('registering....');

    await AsyncStorage.setItem('token', res.data.token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    console.log('register succes');

    dispatch(loadUser());

    dispatch(createProfile({ name }));
  } catch (err) {
    const errors = err.response.data.errors;
    // this errors are the errors send form the backend
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  }
};

// Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    console.log('wait logging in......');
    const res = await axios.post(
      `http://${ipAddress}:3000/api/login`,
      body,
      config
    );

    await AsyncStorage.setItem('token', res.data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
    // Userloaded jaruri hai iske bina header mai token save nahi hongi isliye getmyprofile mai error aa rahi hai

    dispatch(getCurrentProfile());
    console.log('logged in succesfull......');
  } catch (err) {
    const errors = err.response.data.errors; // This errors will come from backend
    // that we setted as errors.array
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  }
};

// Logout / Clear Profile
export const logout = () => async (dispatch) => {
  dispatch({ type: CLEAR_MYPROFILE });
  dispatch({ type: CLEAR_PROFILES });
  dispatch({ type: CLEAR_EVENTS });
  dispatch({ type: CLEARGLOBALPOSTS });
  dispatch({ type: LOGOUT });
  await AsyncStorage.removeItem('token');
};
