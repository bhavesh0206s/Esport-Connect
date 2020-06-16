import {
  GETMYPOSTS,
  CLEARMYPOSTS,
  GETGLOBALPOSTS,
  CLEARGLOBALPOSTS,
  ADDPOST,
  LIKEHANDLESUCCESS,
  CLEARCHANGEDLIKE,
  CHANGEUIDUETOLIKE,
} from './types';
import axios from 'axios';
import { ipAddress } from '../ipaddress';
import { createProfile, getCurrentProfile } from './profile';
import { setAlert } from './alert';
import { AsyncStorage } from 'react-native';
import { socket } from '../../MainComponent';

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
    console.log(err.response.data)
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

//  Like handling of posts
export const likeHandler = (postId, liked) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const data = {token , postId, liked};
    socket.emit('changed like', data);

    socket.on('changed like', (data) => {
      console.log('liked')
      dispatch({
        type: LIKEHANDLESUCCESS,
        payload: { id: postId, likes: data },
      });
    })

  } catch (err) {
    console.error(err);
  }
};

export const changeUIdueTolike = (data) => (dispatch) => {
  dispatch({ type: CHANGEUIDUETOLIKE, payload: data });
};

export const clearChangedlike = () => (dispatch) => {
  dispatch({ type: CLEARCHANGEDLIKE });
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
