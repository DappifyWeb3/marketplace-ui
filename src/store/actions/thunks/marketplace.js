
import * as actions from '../../actions';
import Nft from 'react-dappify/model/NFT';
import { getErrorMessage } from 'store/utils';

export const sellNft = (nft, price, category) => async(dispatch) => {
  dispatch(actions.sellNft.request());
  try {
    // console.log(nft);
    // console.log(price);
    const offering = await nft.sellTo(price, category);
    dispatch(actions.sellNft.success(offering));
    // dispatch(fetchMyCollections());
  } catch (err) {
    console.log(err);
    dispatch(actions.sellNft.failure(getErrorMessage(err)));
  }
};

export const editPriceNft = (nft, price) => async(dispatch) => {
  dispatch(actions.editPriceNft.request());
  try {
    // console.log(nft);
    // console.log(price);
    const offering = await nft.editPricing(price);
    dispatch(actions.editPriceNft.success(offering));
    // dispatch(fetchMyCollections());
  } catch (err) {
    dispatch(actions.editPriceNft.failure(getErrorMessage(err)));
  }
};
