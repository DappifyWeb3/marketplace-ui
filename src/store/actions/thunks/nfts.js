import * as actions from '../../actions';
import { NFT } from 'react-dappify';
import { getErrorMessage } from 'store/utils';

export const fetchNfts = ({category=null, status=null}) => async (dispatch, getState) => {

  dispatch(actions.getNfts.request());

  try {
    const nfts = await NFT.getWithFilters({category, status});
    dispatch(actions.getNfts.success(nfts));
  } catch (err) {
    dispatch(actions.getNfts.failure(err.message));
  }
};

export const withdrawNft = (nft) => async(dispatch) => {
  dispatch(actions.withdrawNft.request());
  try {
    const txHash = await nft.withdrawFromMarketplace();
    dispatch(actions.withdrawNft.success(txHash));
  } catch (err) {
    dispatch(actions.withdrawNft.failure(getErrorMessage(err)));
  }
};

export const saveNft = (nft, collection, imageFile, animationFile) => async(dispatch) => {
  dispatch(actions.saveNft.request());
  try {
    const updatedNft = await nft.save(collection, imageFile, animationFile);
    dispatch(actions.saveNft.success(updatedNft));
  } catch (err) {
    dispatch(actions.saveNft.failure(err.message));
  }
};

export const fetchNftsBreakdown = () => async (dispatch, getState) => {
  dispatch(actions.getNftBreakdown.cancel());
  dispatch(actions.getNftBreakdown.request());
  try {
    const nfts = await NFT.getNewestDrops();
    dispatch(actions.getNftBreakdown.success(nfts));
  } catch (err) {
    dispatch(actions.getNftBreakdown.failure(err.message));
  }
};

export const fullTextSearch = (text) => async (dispatch, getState) => {
  dispatch(actions.fullTextSearch.request());
  try {
    const items = await NFT.fullTextSearch(text);
    dispatch(actions.fullTextSearch.success(items));
  } catch (err) {
    dispatch(actions.fullTextSearch.failure(err.message));
  }
};

export const fetchNftLikes = (user) => async (dispatch, getState) => {
  dispatch(actions.getNftLikes.request());
  try {
    const likes = await NFT.getUserLikes(user);
    const response = { user, likes };
    dispatch(actions.getNftLikes.success(response));
  } catch (err) {
    dispatch(actions.getNftLikes.failure(err.message));
  }
};

export const fetchNftShowcase = () => async (dispatch) => {
  dispatch(actions.getNftShowcase.request());
  try {
    const nfts = await NFT.getHotAuctions();
    dispatch(actions.getNftShowcase.success(nfts));
  } catch (err) {
    dispatch(actions.getNftShowcase.failure(err.message));
  }
};

export const fetchNftDetail = (contractAddress, tokenId='') => async (dispatch) => {
  dispatch(actions.getNftDetail.request());
  try {
    console.log(`GettingById ${contractAddress} ${tokenId}`);
    const nft = await NFT.getById(contractAddress, tokenId.toString());
    dispatch(actions.getNftDetail.success(nft));
  } catch (err) {
    dispatch(actions.getNftDetail.failure(err.message));
  }
};

export const fetchNftsFromCollection = (collection) => async (dispatch) => {
  dispatch(actions.getNftsFromCollection.request());
  try {
    const nfts = await NFT.fromCollection(collection);
    dispatch(actions.getNftsFromCollection.success(nfts));
  } catch (err) {
    dispatch(actions.getNftsFromCollection.failure(err.message));
  }
};

export const fetchHotAuctions = () => async (dispatch) => {
  dispatch(actions.getNftAuctions.request());
  try {
    const bids = await NFT.getHotAuctions();
    dispatch(actions.getNftAuctions.success(bids));
  } catch (err) {
    dispatch(actions.getNftAuctions.failure(err.message));
  }
};


export const fetchNftsFromUser = (user) => async (dispatch) => {
  dispatch(actions.getNftsFromUser.request());
  try {
    const nfts = await NFT.getFromUser(user);
    dispatch(actions.getNftsFromUser.success(nfts));
  } catch (err) {
    dispatch(actions.getNftsFromUser.failure(err.message));
  }
};

export const bidNft = (user, nft, amount) => async(dispatch) => {
  dispatch(actions.bidNft.request());
  try {
    await nft.bidBy(user, amount);
    dispatch(actions.bidNft.success());
    dispatch(fetchNftDetail(nft.collection.address, nft.tokenId));
  } catch (err) {
    dispatch(actions.bidNft.failure(err.message));
  }
};

export const purchaseNft = (nft, quantity) => async(dispatch) => {
  dispatch(actions.purchaseNft.request());
  try {
    const txHash = await nft.purchase(quantity);
    dispatch(actions.purchaseNft.success(txHash));
  } catch (err) {
    dispatch(actions.purchaseNft.failure(getErrorMessage(err)));
  }
};

export const toggleLikeNft = (nft) => async(dispatch) => {
  dispatch(actions.likeNft.request());
  try {
    await nft.like();
    dispatch(actions.likeNft.success());
    dispatch(fetchNftLikes());
  } catch (err) {
    dispatch(actions.likeNft.failure(err.message));
  }
};

export const modalReset = () => async(dispatch) => {
  dispatch(actions.withdrawNft.cancel());
  dispatch(actions.purchaseNft.cancel());
  dispatch(actions.editPriceNft.cancel());
  dispatch(actions.sellNft.cancel());
};