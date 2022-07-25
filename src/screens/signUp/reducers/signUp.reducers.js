import { HIDE_MODAL, LOADING, SHOW_MODAL, SIGN_UP, SIGN_UP_DATA, SIGN_UP_DEFAULT, SIGN_UP_FAILED, SIGN_UP_SUCCESSFUL, STOP_LOADING } from '../actions/signUp.type';

const initialState = {
  loading: false,
  isVisible: false,
  modalDataType: null,
  userData: {},
  user: {},
  signUpSuccessful: false,
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      }
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      }
    case SIGN_UP:
      return {
        ...state,
        loading: true,
      }
    case SHOW_MODAL:
      return {
        ...state,
        isVisible: true,
        modalDataType: action.payload,
      }
    case HIDE_MODAL:
      return {
        ...state,
        isVisible: false,
        modalDataType: null,
      }
    case SIGN_UP_SUCCESSFUL:
      return {
        ...state,
        signUpSuccessful: true,
        userData: {},
      }
    case SIGN_UP_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case SIGN_UP_DATA:
      return {
        ...state,
        userData: action.payload,
      }
    case SIGN_UP_DEFAULT:
      return {
        ...state,
        signUpSuccessful: false,
      }
    default:
      return state
  }
}

export default signUpReducer;