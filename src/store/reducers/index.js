import { combineReducers } from 'redux';
import nftReducer from './nfts';
import collectionsReducer from './collections';
import usersReducer from './users';
import filterReducer from './filters';
import blogPostsReducer from './blogs';
import projectReducer from './project';
import marketplaceReducer from './marketplace';

export const rootReducer = combineReducers({
  NFT: nftReducer,
  collections: collectionsReducer,
  users: usersReducer,
  filters: filterReducer,
  blogs: blogPostsReducer,
  project: projectReducer,
  marketplace: marketplaceReducer,
});

const reducers = (state, action) => rootReducer(state, action);

export default reducers;