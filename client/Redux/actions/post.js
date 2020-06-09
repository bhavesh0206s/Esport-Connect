import {
  GETMYPOSTS,
  CLEARMYPOSTS,
  GETGLOBALPOSTS,
  CLEARGLOBALPOSTS,
  ADDPOST,
} from './types';
import axios from 'axios';
import { ipAddress } from '../ipaddress';
import { createProfile, getCurrentProfile } from './profile';
import { setAlert } from './alert';

//  Get all posts to show on home page

export const addPost = (text) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(`http://${ipAddress}:3000/api/post/addmypost`, {text}, config);

    dispatch({
      type: ADDPOST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data.errors)
    dispatch({
      type: CLEARGLOBALPOSTS,
    });
  }
};

export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://${ipAddress}:3000/api/post/allposts`);
    
    dispatch({
      type: GETGLOBALPOSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLEARGLOBALPOSTS,
    });
  }
};

// Delete my post
export const deletePost = () => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://${ipAddress}:3000/api/post/deletepost/:post_id`
    );

    console.log('deleting post....');

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    console.log('delete succes');

    dispatch(loadUser());


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
