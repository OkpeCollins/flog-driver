import { ONBOARD } from "../actions/onboarding.type";

const initialState = {
  onboarded: false,
};

const onboardingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ONBOARD:
      return {
        ...state,
        onboarded: true,
      };
    default:
      return state;
  }
}

export default onboardingReducer;