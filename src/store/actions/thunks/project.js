import * as actions from 'store/actions';
import {Project} from 'react-dappify';

export const fetchTokenPrice = () => async(dispatch) => {
  dispatch(actions.getTokenPrice.request());
  try {
    const price = await Project.getTokenPrice();
    dispatch(actions.getTokenPrice.success(price));
  } catch (err) {
    dispatch(actions.getTokenPrice.failure(err));
  }
};