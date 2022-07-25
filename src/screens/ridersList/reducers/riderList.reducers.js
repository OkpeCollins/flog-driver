import {
  ACTION_SUCCESS,
  ADD_RIDER,
  GET_RIDER_SUCCESS,
  HIDE_DOC,
  HIDE_MODAL,
  HIDE_SUCCESS_MODAL,
  LOADING,
  RESET_ACTION_SUCCESS,
  RIDER_DATA,
  RIDER_STAT,
  SHOW_MODAL,
  SINGLE_RIDER,
  STOP_LOADING,
  VIEW_DOC
} from '../actions/riderList.type';

const initialState = {
  loading: false,
  isVisible: false,
  modalDataType: null,
  riderData: {},
  showSuccessModal: false,
  yourRiders: [],
  singleRider: {},
  riderStat: {
    stat: [{
        name: "completed Trips",
        value: 0
    },{
      name: "rating",
      value: 0
    }, {
        name: "cancelled Trip",
        value: 0
    }],
    earning: {
        totalEarning: {
            "value": "0.00"
        },
        totalCardEarning: {
            "value": "0.00"
        },
        totalCashEarning: {
            "value": "0.00"
        }
    }
  },
  visiblity: false,
  showDocModal: false,
  imageData: {},
  triggerAPICall: 0,
  actionSucces: false,
};

const riderListReducer = (state = initialState, action) => {
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
    case RIDER_DATA:
      return {
        ...state,
        riderData: action.payload,
      }
    case ADD_RIDER:
      return {
        ...state,
        showSuccessModal: true,
        riderData: {},
        triggerAPICall: Math.random(),
      }
    case HIDE_SUCCESS_MODAL:
      return {
        ...state,
        showSuccessModal: false,
      }
    case GET_RIDER_SUCCESS:
      return {
        ...state,
        yourRiders: action.payload,
        actionSucces: false,
      }
    case SINGLE_RIDER:
      return {
        ...state,
        singleRider: action.payload,
        }
      case RIDER_STAT:
        return {
          ...state,
          riderStat: action.payload,
        }
      case VIEW_DOC:
        return {
          ...state,
          showDocModal: true,
          imageData: action.payload,
        }
      case HIDE_DOC:
        return {
          ...state,
          showDocModal: false,
          // imageData: {},
        }
      case ACTION_SUCCESS:
        return {
          ...state,
          triggerAPICall: Math.random(),
          actionSucces: true,
        }
      case RESET_ACTION_SUCCESS:
        return {
          ...state,
          actionSucces: false,
        }
    default:
      return state
  }
}

export default riderListReducer;