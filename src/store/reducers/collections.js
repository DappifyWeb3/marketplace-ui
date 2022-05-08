import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  hotCollections: initEntityState([]),
  myCollections: initEntityState([]),
  collection: initEntityState({}),
  save: initEntityState(),
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    
    case getType(actions.getHotCollections.request):
      return { ...state, hotCollections: entityLoadingStarted(state.hotCollections, action.payload) };
    case getType(actions.getHotCollections.success):
      return { ...state, hotCollections: entityLoadingSucceeded(state.hotCollections, action.payload) };
    case getType(actions.getHotCollections.failure):
      return { ...state, hotCollections: entityLoadingFailed(state.hotCollections) };    


      case getType(actions.getCollection.request):
        return { ...state, collection: entityLoadingStarted(state.collection, action.payload) };
      case getType(actions.getCollection.success):
        return { ...state, collection: entityLoadingSucceeded(state.collection, action.payload) };
      case getType(actions.getCollection.failure):
        return { ...state, collection: entityLoadingFailed(state.collection) };    
  
        case getType(actions.saveCollection.request):
          return { ...state, save: entityLoadingStarted(state.save, action.payload) };
        case getType(actions.saveCollection.success):
          return { ...state, save: entityLoadingSucceeded(state.save, action.payload) };
        case getType(actions.saveCollection.failure):
          return { ...state, save: entityLoadingFailed(state.save) };    
    
  

        
  
    case getType(actions.getMyCollections.request): {
      return { ...state, myCollections: entityLoadingStarted(state.myCollections, action.payload) };
    }
    case getType(actions.getMyCollections.success): {
      return { ...state, myCollections: entityLoadingSucceeded(state.myCollections, action.payload) };
    }
    case getType(actions.getMyCollections.failure):
      return { ...state, myCollections: entityLoadingFailed(state.myCollections) };    

    default:
      return state;
  }
};

export default states;
