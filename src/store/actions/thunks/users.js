import * as actions from 'store/actions';
import {UserProfile} from 'react-dappify';
import { fetchNftsFromUser } from 'store/actions/thunks';

export const fetchCurrentUser = () => async (dispatch) => {
  dispatch(actions.getCurrentUser.request());
  try {
    const currentUser = await UserProfile.getCurrentUser();
    dispatch(fetchNftsFromUser(currentUser));
    dispatch(actions.getCurrentUser.success(currentUser));
  } catch (err) {
    dispatch(actions.getCurrentUser.failure(err));
  }
};

export const saveCurrentUser = ({currentUser, profileImage, bannerImage}) => async(dispatch) => {
  dispatch(actions.saveCurrentUser.request());
  try {
    await currentUser.save({ profileImage, bannerImage });
    dispatch(actions.saveCurrentUser.success(currentUser));
    dispatch(fetchCurrentUser());
  } catch (err) {
    dispatch(actions.saveCurrentUser.failure(err));
  }
};

export const fetchUser = (authorId) => async (dispatch) => {
  dispatch(actions.getUser.request());
  try {
    const user = await UserProfile.getUser(authorId);
    dispatch(fetchNftsFromUser(user))
    dispatch(actions.getUser.success(user));
  } catch (err) {
    dispatch(actions.getUser.failure(err));
  }
};

export const fetchUserRanking = () => async (dispatch) => {
  dispatch(actions.getUserRanking.request());
  try {
    const userRanking = await UserProfile.getRankingBySales();
    dispatch(actions.getUserRanking.success(userRanking));
  } catch (err) {
    dispatch(actions.getUserRanking.failure(err));
  }
};