import * as actions from 'store/actions';

export const getBlogPosts = (Moralis, configuration, postId) => async (dispatch) => {

  dispatch(actions.getBlogPosts.request());

  try {
    const News = Moralis.Object.extend("News");
    const query = new Moralis.Query(News);
    query.equalTo("appId", configuration.appId);
    const data = postId ? await query.first() : await query.find();

    dispatch(actions.getBlogPosts.success(data));
  } catch (err) {
    dispatch(actions.getBlogPosts.failure(err));
  }
};

export const getBlogComments = (postId) => async (dispatch) => {

  dispatch(actions.getComments.request());

  try {
    const { data } = {};

    dispatch(actions.getComments.success(data));
  } catch (err) {
    dispatch(actions.getComments.failure(err));
  }
};

export const getBlogTags = (postId) => async (dispatch) => {

  dispatch(actions.getTags.request());

  try {
    const { data } = {};

    dispatch(actions.getTags.success(data));
  } catch (err) {
    dispatch(actions.getTags.failure(err));
  }
};

export const getRecentPosts = () => async (dispatch) => {

  dispatch(actions.getRecentPosts.request());

  try {
    const { data } = {};

    dispatch(actions.getRecentPosts.success(data));
  } catch (err) {
    dispatch(actions.getRecentPosts.failure(err));
  }
};
