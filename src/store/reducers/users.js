import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  user: initEntityState(null),
  rankings: initEntityState(null),
  current: initEntityState(null),
  save: initEntityState(null)
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    
    case getType(actions.getUser.request):
      return { ...state, user: entityLoadingStarted(state.user, action.payload) };
    case getType(actions.getUser.success):
      return { ...state, user: entityLoadingSucceeded(state.user, action.payload) };
    case getType(actions.getUser.failure):
      return { ...state, user: entityLoadingFailed(state.user) };
    
      case getType(actions.saveCurrentUser.request):
        return { ...state, save: entityLoadingStarted(state.save, action.payload) };
      case getType(actions.saveCurrentUser.success):
        return { ...state, save: entityLoadingSucceeded(state.save, action.payload) };
      case getType(actions.saveCurrentUser.failure):
        return { ...state, save: entityLoadingFailed(state.save) };    
  


      case getType(actions.getUserRanking.request):
      return { ...state, rankings: entityLoadingStarted(state.rankings, action.payload) };
    case getType(actions.getUserRanking.success):
      return { ...state, rankings: entityLoadingSucceeded(state.rankings, action.payload) };
    case getType(actions.getUserRanking.failure):
      return { ...state, rankings: entityLoadingFailed(state.rankings) };

      case getType(actions.getCurrentUser.request):
        return { ...state, current: entityLoadingStarted(state.current, action.payload) };
      case getType(actions.getCurrentUser.success):
        return { ...state, current: entityLoadingSucceeded(state.current, action.payload) };
      case getType(actions.getCurrentUser.failure):
        return { ...state, current: entityLoadingFailed(state.current) };

        
    default:
      return state;
  }
};

export default states;
