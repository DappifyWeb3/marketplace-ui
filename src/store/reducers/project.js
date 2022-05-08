import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  tokenPrice: initEntityState([])
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    
    case getType(actions.getTokenPrice.request):
      return { ...state, tokenPrice: entityLoadingStarted(state.tokenPrice, action.payload) };
    case getType(actions.getTokenPrice.success):
      return { ...state, tokenPrice: entityLoadingSucceeded(state.tokenPrice, action.payload) };
    case getType(actions.getTokenPrice.failure):
      return { ...state, tokenPrice: entityLoadingFailed(state.tokenPrice) };    

    default:
      return state;
  }
};

export default states;
