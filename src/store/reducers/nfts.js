import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
  nftsFromUser: initEntityState(null),
  nftBreakdown: initEntityState(null),
  nftDetail: initEntityState(null),
  nftShowcase: initEntityState(null),
  nftsFromCollection: initEntityState(null),
  nftLikes: initEntityState(null),
  nftAuctions: initEntityState(null),
  nfts: initEntityState(null),
  save: initEntityState(null),
  withdraw: initEntityState(null),
  purchase: initEntityState(null),
  fullTextSearchResults: initEntityState(null),
};

const states = (state = defaultState, action) => {
  switch (action.type) {
    
    case getType(actions.fullTextSearch.request):
      return { ...state, fullTextSearchResults: entityLoadingStarted(state.fullTextSearchResults, action.payload) };
    case getType(actions.fullTextSearch.success):
      return { ...state, fullTextSearchResults: entityLoadingSucceeded(state.fullTextSearchResults, action.payload) };
    case getType(actions.fullTextSearch.failure):
      return { ...state, fullTextSearchResults: entityLoadingFailed(state.fullTextSearchResults) };
    
      case getType(actions.withdrawNft.request):
        return { ...state, withdraw: entityLoadingStarted(state.withdraw, action.payload) };
      case getType(actions.withdrawNft.success):
        return { ...state, withdraw: entityLoadingSucceeded(state.withdraw, action.payload) };
      case getType(actions.withdrawNft.failure):
        return { ...state, withdraw: entityLoadingFailed(state.withdraw, action.payload) };
        case getType(actions.withdrawNft.cancel):
          return { ...state, withdraw: initEntityState(null)};

        case getType(actions.purchaseNft.request):
          return { ...state, purchase: entityLoadingStarted(state.purchase, action.payload) };
        case getType(actions.purchaseNft.success):
          return { ...state, purchase: entityLoadingSucceeded(state.purchase, action.payload) };
        case getType(actions.purchaseNft.failure):
          return { ...state, purchase: entityLoadingFailed(state.purchase, action.payload) };
        

    case getType(actions.getNfts.request):
      return { ...state, nfts: entityLoadingStarted(state.nfts, action.payload) };
    case getType(actions.getNfts.success):
      return { ...state, nfts: entityLoadingSucceeded(state.nfts, action.payload) };
    case getType(actions.getNfts.failure):
      return { ...state, nfts: entityLoadingFailed(state.nfts) };
    

    case getType(actions.getNftAuctions.request):
      return { ...state, nftAuctions: entityLoadingStarted(state.nftAuctions, action.payload) };
    case getType(actions.getNftAuctions.success):
      //append existing data with new data
      let auctions = state.nftAuctions.data ? [...state.nftAuctions.data, ...action.payload] : action.payload;
      return { ...state, nftAuctions: entityLoadingSucceeded(state.nftAuctions, auctions) };
    case getType(actions.getNftAuctions.failure):
      return { ...state, nftAuctions: entityLoadingFailed(state.nftAuctions) };
    

    case getType(actions.getNftBreakdown.request):
      return { ...state, nftBreakdown: entityLoadingStarted(state.nftBreakdown, action.payload) };
    case getType(actions.getNftBreakdown.success):
      //append existing data with new data
      let payload = state.nftBreakdown.data ? [...state.nftBreakdown.data, ...action.payload] : action.payload;
      return { ...state, nftBreakdown: entityLoadingSucceeded(state.nftBreakdown, payload) };
    case getType(actions.getNftBreakdown.failure):
      return { ...state, nftBreakdown: entityLoadingFailed(state.nftBreakdown) };
    
    case getType(actions.getNftDetail.request):
      return { ...state, nftDetail: entityLoadingStarted(state.nftDetail, action.payload) };
    case getType(actions.getNftDetail.success):
      return { ...state, nftDetail: entityLoadingSucceeded(state.nftDetail, action.payload) };
    case getType(actions.getNftDetail.failure):
      return { ...state, nftDetail: entityLoadingFailed(state.nftDetail) };
    
      case getType(actions.saveNft.request):
        return { ...state, save: entityLoadingStarted(state.save, action.payload) };
      case getType(actions.saveNft.success):
        return { ...state, save: entityLoadingSucceeded(state.save, action.payload) };
      case getType(actions.saveNft.failure):
        return { ...state, save: entityLoadingFailed(state.save) };
      
        case getType(actions.getNftLikes.request):
          return { ...state, nftLikes: entityLoadingStarted(state.nftLikes, action.payload) };
        case getType(actions.getNftLikes.success):
          const currentLikes = state.nftLikes;
          let { data} = currentLikes;
          if (!data) {
            data = {};
          }
          const { user, likes } = action.payload;
          data[ user ? user.id : 'self'] = likes || [];
          const newState = { ...state, nftLikes: entityLoadingSucceeded(state.nftLikes, data) };
          return newState;
        case getType(actions.getNftLikes.failure):
          return { ...state, nftLikes: entityLoadingFailed(state.nftLikes) };
    
          
      case getType(actions.getNftsFromCollection.request):
        return { ...state, nftsFromCollection: entityLoadingStarted(state.nftsFromCollection, action.payload) };
      case getType(actions.getNftsFromCollection.success):
        return { ...state, nftsFromCollection: entityLoadingSucceeded(state.nftsFromCollection, action.payload) };
      case getType(actions.getNftsFromCollection.failure):
        return { ...state, nftsFromCollection: entityLoadingFailed(state.nftsFromCollection) };
    

        case getType(actions.getNftsFromUser.request):
          return { ...state, nftsFromUser: entityLoadingStarted(state.nftsFromUser, action.payload) };
        case getType(actions.getNftsFromUser.success):
          return { ...state, nftsFromUser: entityLoadingSucceeded(state.nftsFromUser, action.payload) };
        case getType(actions.getNftsFromUser.failure):
          return { ...state, nftsFromUser: entityLoadingFailed(state.nftsFromUser) };
      
        

    case getType(actions.getNftShowcase.request):
      return { ...state, nftShowcase: entityLoadingStarted(state.nftShowcase, action.payload) };
    case getType(actions.getNftShowcase.success):
      return { ...state, nftShowcase: entityLoadingSucceeded(state.nftShowcase, action.payload) };
    case getType(actions.getNftShowcase.failure):
      return { ...state, nftShowcase: entityLoadingFailed(state.nftShowcase) };

    case getType(actions.clearNfts):
      return { ...state, nftBreakdown: initEntityState(null)};
    
    default:
      return state;
  }
};

export default states;
