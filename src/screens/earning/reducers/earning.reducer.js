import {
  CURRENT_WEEK_NET,
  LOADING,
  NET_CURRENT_WEEK_DISPLAY,
  NET_PREVIOUS_WEEK_DISPLAY,
  NET_THREE_MONTH_DISPLAY,
  PREVIOUS_WEEK_NET,
  STOP_LOADING,
  THREE_MONTH_NET,
  PREVIOUS_WEEK_REVENUE,
  CURRENT_WEEK_REVENUE,
  THREE_MONTH_REVENUE,
  REVENUE_PREVIOUS_WEEK_DISPLAY,
  REVENUE_CURRENT_WEEK_DISPLAY,
  REVENUE_THREE_MONTH_DISPLAY,
  PREVIOUS_WEEK_BALANCE,
  CURRENT_WEEK_BALANCE,
  THREE_MONTH_BALANCE,
  BALANCE_PREVIOUS_WEEK_DISPLAY,
  BALANCE_CURRENT_WEEK_DISPLAY,
  BALANCE_THREE_MONTH_DISPLAY,
} from "../actions/earning.type";

const initialState = {
  loading: false,
  netRevenue: {},
  netPreviousWeek: {days:[]},
  netCurrentWeek: {days:[]},
  netThreeMonth: {months:[]},
  netPreviousWeekDisplay: new Array(7).fill(false),
  netCurrentWeekDisplay: new Array(7).fill(false),
  netThreeMonthDisplay: new Array(3).fill(false),

  revenuePreviousWeek: {revenue:[]},
  revenueCurrentWeek: {revenue:[]},
  revenueThreeMonth: {revenue:[]},
  revenuePreviousWeekDisplay: new Array(7).fill(false),
  revenueCurrentWeekDisplay: new Array(7).fill(false),
  revenueThreeMonthDisplay: new Array(3).fill(false),

  balancePreviousWeek: {balance:[]},
  balanceCurrentWeek: {balance:[]},
  balanceThreeMonth: {balance:[]},
}

function earningReducer(state = initialState, action) {
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
    case PREVIOUS_WEEK_NET:
      return {
        ...state,
        netPreviousWeek: action.payload,
      }
    case CURRENT_WEEK_NET:
      return {
        ...state,
        netCurrentWeek: action.payload,
      }
    case THREE_MONTH_NET:
      return {
        ...state,
        netThreeMonth: action.payload,
      }
    case NET_PREVIOUS_WEEK_DISPLAY:
      return {
        ...state,
        netPreviousWeekDisplay: action.payload,
      }
    case NET_CURRENT_WEEK_DISPLAY:
      return {
        ...state,
        netCurrentWeekDisplay: action.payload,
      }
    case NET_THREE_MONTH_DISPLAY:
      return {
        ...state,
        netThreeMonthDisplay: action.payload,
      }
    //Revenue tab reducer
    case PREVIOUS_WEEK_REVENUE:
      return {
        ...state,
        revenuePreviousWeek: action.payload,
      }
    case CURRENT_WEEK_REVENUE:
      return {
        ...state,
        revenueCurrentWeek: action.payload,
      }
    case THREE_MONTH_REVENUE:
      return {
        ...state,
        revenueThreeMonth: action.payload,
      }
    case REVENUE_PREVIOUS_WEEK_DISPLAY:
      return {
        ...state,
        revenuePreviousWeekDisplay: action.payload,
      }
    case REVENUE_CURRENT_WEEK_DISPLAY:
      return {
        ...state,
        revenueCurrentWeekDisplay: action.payload,
      }
    case REVENUE_THREE_MONTH_DISPLAY:
      return {
        ...state,
        revenueThreeMonthDisplay: action.payload,
      }
    
    //Balance tab reducer
      case PREVIOUS_WEEK_BALANCE:
        return {
          ...state,
          balancePreviousWeek: action.payload,
        }
      case CURRENT_WEEK_BALANCE:
        return {
          ...state,
          balanceCurrentWeek: action.payload,
        }
      case THREE_MONTH_BALANCE:
        return {
          ...state,
          balanceThreeMonth: action.payload,
        }
    default:
      return state;
    }
}

export default earningReducer;