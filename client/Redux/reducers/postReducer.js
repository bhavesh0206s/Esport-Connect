import {
  GETMYPOSTS,
  CLEARMYPOSTS,
  GETGLOBALPOSTS,
  CLEARGLOBALPOSTS,
  ADDPOST,
  LIKEHANDLESUCCESS,
  CLEARCHANGEDLIKE,
  CHANGEUIDUETOLIKE,
} from '../actions/types';

const initialState = {
  globalposts: [],
  loading: true,
  changedlike: null,
  // error: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GETGLOBALPOSTS:
      console.log('GETGLOBALPOSTS-SUCCESSFULL');
      return {
        ...state,
        globalposts: [...payload],
        loading: false,
      };
    case ADDPOST:
      console.log('ADDPOST-SUCCESSFULL');
      return {
        ...state,
        post: [...payload],
        loading: false,
      };
    case CLEARGLOBALPOSTS:
      return {
        ...state,
        globalposts: [],
        loading: false,
      };
    case LIKEHANDLESUCCESS:
      // This will instantly change the like number in our app
      return {
        ...state,
        changedlike: { id: payload.id, likes: payload.likes },
        loading: false,
      };
    case CHANGEUIDUETOLIKE:
      // This will change the like number in users app when anyone like/unlike post
      return {
        ...state,
        
      };
    case CLEARCHANGEDLIKE:
      return {
        ...state,
        changedlike: null,
      };
    default:
      return state;
  }
};
