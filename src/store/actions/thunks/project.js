import * as actions from 'store/actions';
import Project from 'react-dappify/model/Project';

export const fetchTokenPrice = () => async(dispatch) => {
  dispatch(actions.getTokenPrice.request());
  try {
    // // // console.log(nft);
    const price = await Project.getTokenPrice();
    dispatch(actions.getTokenPrice.success(price));
    // dispatch(fetchMyCollections());
  } catch (err) {
    dispatch(actions.getTokenPrice.failure(err));
  }
};