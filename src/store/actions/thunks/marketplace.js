
import * as actions from '../../actions';
import { fetchNftDetail, fetchHotAuctions, fetchNftsBreakdown } from "../../actions/thunks/nfts";
import { fetchCurrentUser } from "../../actions/thunks/users";
import { getErrorMessage } from 'store/utils';

export const sellNft = (nft, price, category, quantity=1) => async(dispatch) => {
  dispatch(actions.sellNft.request());
  try {
    const offering = await nft.sellTo(price, category, quantity);
    dispatch(actions.sellNft.success(offering));
    dispatch(fetchNftDetail(nft.collection.address, nft.tokenId));
    dispatch(fetchHotAuctions());
    dispatch(fetchNftsBreakdown());
    dispatch(fetchCurrentUser());
  } catch (err) {
    console.log(err);
    dispatch(actions.sellNft.failure(getErrorMessage(err)));
  }
};

export const editPriceNft = (nft, price) => async(dispatch) => {
  dispatch(actions.editPriceNft.request());
  try {
    const offering = await nft.editPricing(price);
    dispatch(actions.editPriceNft.success(offering));
    dispatch(fetchNftDetail(nft.collection.address, nft.tokenId));
    dispatch(fetchHotAuctions());
    dispatch(fetchNftsBreakdown());
    dispatch(fetchCurrentUser());
  } catch (err) {
    dispatch(actions.editPriceNft.failure(getErrorMessage(err)));
  }
};
