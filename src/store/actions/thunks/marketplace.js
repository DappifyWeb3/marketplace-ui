
import * as actions from '../../actions';
import { getErrorMessage } from 'store/utils';

export const sellNft = (nft, price, category) => async(dispatch) => {
  dispatch(actions.sellNft.request());
  try {
    const offering = await nft.sellTo(price, category);
    dispatch(actions.sellNft.success(offering));
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
  } catch (err) {
    dispatch(actions.editPriceNft.failure(getErrorMessage(err)));
  }
};
