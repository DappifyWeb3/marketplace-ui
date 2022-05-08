import * as actions from '../../actions';
import Nft from 'react-dappify/model/NFT';
import { getErrorMessage } from 'store/utils';

export const fetchNfts = ({category=null, status=null}) => async (dispatch, getState) => {

  dispatch(actions.getNfts.request());

  try {
    const nfts = await Nft.getWithFilters({category, status});
    // console.log(nfts);
    dispatch(actions.getNfts.success(nfts));
  } catch (err) {
    dispatch(actions.getNfts.failure(err.message));
  }
};

// export const editPriceNft = (nft, newPrice) => async(dispatch) => {
//   dispatch(actions.saveNft.request());
//   try {
//     // // // console.log(nft);
//     const updatedNft = await nft.editPrice(newPrice);
//     dispatch(actions.saveNft.success(updatedNft));
//     // dispatch(fetchMyCollections());
//   } catch (err) {
//     dispatch(actions.saveNft.failure(err));
//   }
// };

export const withdrawNft = (nft) => async(dispatch) => {
  dispatch(actions.withdrawNft.request());
  try {
    // // // console.log(nft);
    const txHash = await nft.withdrawFromMarketplace();
    dispatch(actions.withdrawNft.success(txHash));
    // dispatch(fetchMyCollections());
  } catch (err) {
    console.log(err);
    dispatch(actions.withdrawNft.failure(getErrorMessage(err)));
  }
};

export const saveNft = (nft, collection, imageFile, animationFile) => async(dispatch) => {
  dispatch(actions.saveNft.request());
  try {
    // // // console.log(nft);
    const updatedNft = await nft.save(collection, imageFile, animationFile);
    dispatch(actions.saveNft.success(updatedNft));
    // dispatch(fetchMyCollections());
  } catch (err) {
    dispatch(actions.saveNft.failure(err.message));
  }
};

export const fetchNftsBreakdown = (Provider, authorId, isMusic = false) => async (dispatch, getState) => {

  dispatch(actions.getNftBreakdown.request());

  try {
    const nfts = await Nft.getNewestDrops();

    dispatch(actions.getNftBreakdown.success(nfts));
  } catch (err) {
    dispatch(actions.getNftBreakdown.failure(err.message));
  }
};

export const fullTextSearch = (text) => async (dispatch, getState) => {
  // // console.log(text);
  dispatch(actions.fullTextSearch.request());

  try {
    const items = await Nft.fullTextSearch(text);

    dispatch(actions.fullTextSearch.success(items));
  } catch (err) {
    dispatch(actions.fullTextSearch.failure(err.message));
  }
};

export const fetchNftLikes = (user) => async (dispatch, getState) => {
  // // console.log("updating likes0");
  dispatch(actions.getNftLikes.request());

  try {
    const likes = await Nft.getUserLikes(user);
    const response = { user, likes };
    dispatch(actions.getNftLikes.success(response));
  } catch (err) {
    dispatch(actions.getNftLikes.failure(err.message));
  }
};

export const fetchNftShowcase = () => async (dispatch) => {

  dispatch(actions.getNftShowcase.request());

  try {
    const { data } = {};

    dispatch(actions.getNftShowcase.success(data));
  } catch (err) {
    dispatch(actions.getNftShowcase.failure(err.message));
  }
};

export const fetchNftDetail = (contractAddress, tokenId) => async (dispatch) => {

  dispatch(actions.getNftDetail.request());

  try {
    // const { data } = await Axios.get(`${api.baseUrl}${api.nfts}/${tokenId}`, {
    //   cancelToken: Canceler.token,
    //   params: {}
    // });
    // const Item = Moralis.Object.extend("Item");
    // const query = new Moralis.Query(Item);
    // query.equalTo("contract", contractAddress);
    // query.equalTo("tokenId", parseInt(tokenId));
    // const data = await query.first();
    const nft = await Nft.getById(contractAddress, tokenId);
    dispatch(actions.getNftDetail.success(nft));
  } catch (err) {
    dispatch(actions.getNftDetail.failure(err.message));
  }
};

export const fetchNftsFromCollection = (collection) => async (dispatch) => {
  dispatch(actions.getNftsFromCollection.request());
  try {
    const nfts = await Nft.fromCollection(collection);
    dispatch(actions.getNftsFromCollection.success(nfts));
  } catch (err) {
    dispatch(actions.getNftsFromCollection.failure(err.message));
  }
};

export const fetchHotAuctions = () => async (dispatch) => {
  dispatch(actions.getNftAuctions.request());
  try {
    const bids = await Nft.getHotAuctions();
    dispatch(actions.getNftAuctions.success(bids));
  } catch (err) {
    dispatch(actions.getNftAuctions.failure(err.message));
  }
};


export const fetchNftsFromUser = (user) => async (dispatch) => {
  dispatch(actions.getNftsFromUser.request());
  try {
    // // // console.log(user);
    // // // console.log("dipsatched nfts for user");
    // // // console.log(user);
    const nfts = await Nft.getFromUser(user);
    dispatch(actions.getNftsFromUser.success(nfts));
  } catch (err) {
    dispatch(actions.getNftsFromUser.failure(err.message));
  }
};

export const bidNft = (user, nft, amount) => async(dispatch) => {
  dispatch(actions.bidNft.request());
  try {
    // // // console.log(nft);
    await nft.bidBy(user, amount);
    dispatch(actions.bidNft.success());
    dispatch(fetchNftDetail(nft.collection.id, nft.id));
    // dispatch(actions.saveNft.success(updatedNft));
    // dispatch(fetchMyCollections());
  } catch (err) {
    dispatch(actions.bidNft.failure(err.message));
  }
};

export const purchaseNft = (user, nft, amount) => async(dispatch) => {
  dispatch(actions.purchaseNft.request());
  try {
    // // // console.log(nft);
    const txHash = await nft.purchase();
    dispatch(actions.purchaseNft.success(txHash));
    dispatch(fetchNftDetail(nft.collection.id, nft.id));
    // dispatch(fetchMyCollections());
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
    // dispatch(fetchMyCollections());
  } catch (err) {
    dispatch(actions.likeNft.failure(err.message));
  }
};