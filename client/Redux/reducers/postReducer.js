import {
  GETMYPOSTS,
  CLEARMYPOSTS,
  GETGLOBALPOSTS,
  CLEARGLOBALPOSTS,
  ADDPOST,
} from '../actions/types';

const initialState = {
  globalposts: [],
  loading: true,
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
    default:
      return state;
  }
};
