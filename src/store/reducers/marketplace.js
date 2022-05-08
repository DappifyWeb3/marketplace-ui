import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  save: initEntityState(null),
  edit: initEntityState(null),
  sell: initEntityState(null),
};

const states = (state = defaultState, action) => {
  switch (action.type) {

    case getType(actions.sellNft.request):
      return { ...state, sell: entityLoadingStarted(state.sell, action.payload) };
    case getType(actions.sellNft.success):
      return { ...state, sell: entityLoadingSucceeded(state.sell, action.payload) };
    case getType(actions.sellNft.failure):
      return { ...state, sell: entityLoadingFailed(state.sell, action.payload) };
    case getType(actions.sellNft.cancel):
        return { ...state, sell: initEntityState(null)};
    

      case getType(actions.saveNft.request):
        return { ...state, save: entityLoadingStarted(state.save, action.payload) };
      case getType(actions.saveNft.success):
        return { ...state, save: entityLoadingSucceeded(state.save, action.payload) };
      case getType(actions.saveNft.failure):
        return { ...state, save: entityLoadingFailed(state.save) };
      
        case getType(actions.editPriceNft.request):
          return { ...state, edit: entityLoadingStarted(state.edit, action.payload) };
        case getType(actions.editPriceNft.success):
          return { ...state, edit: entityLoadingSucceeded(state.edit, action.payload) };
        case getType(actions.editPriceNft.failure):
          return { ...state, edit: entityLoadingFailed(state.edit, action.payload) };
          case getType(actions.editPriceNft.cancel):
        return { ...state, edit: initEntityState(null)};
          
    default:
      return state;
  }
};

export default states;
