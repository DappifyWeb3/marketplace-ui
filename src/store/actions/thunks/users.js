import * as actions from 'store/actions';
import UserProfile from 'react-dappify/model/UserProfile';
import { fetchNftsFromUser } from 'store/actions/thunks';

export const fetchCurrentUser = () => async (dispatch) => {
  dispatch(actions.getCurrentUser.request());
  try {
    const currentUser = await UserProfile.getCurrentUser();
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
    // let filter = authorId ? 'id='+authorId : '';
    // const { data } = await Axios.get(`${api.baseUrl}${api.authors}?${filter}`, {
    //   cancelToken: Canceler.token,
    //   params: {}
    // });
    // // // console.log(data);
    const user = await UserProfile.getUser(authorId);
    dispatch(fetchNftsFromUser(user))
    // const nfts = await Nft.getFromUser(user);
    // dispatch(actions.getNftsFromUser.success(nfts));
    dispatch(actions.getUser.success(user));
  } catch (err) {
    dispatch(actions.getUser.failure(err));
  }
};

export const fetchUserRanking = () => async (dispatch) => {

  dispatch(actions.getUserRanking.request());

  try {
    // // console.log('fetching user ranking');
    const userRanking = await UserProfile.getRankingBySales();
    // // // console.log(userRanking);
    dispatch(actions.getUserRanking.success(userRanking));
  } catch (err) {
    dispatch(actions.getUserRanking.failure(err));
  }
};