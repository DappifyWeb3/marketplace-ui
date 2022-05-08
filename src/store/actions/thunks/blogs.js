import * as actions from '../../actions';

export const getBlogPosts = (Moralis, configuration, postId) => async (dispatch) => {

  dispatch(actions.getBlogPosts.request());

  try {
    // const { data } = await Axios.get(`${api.baseUrl}${api.blogs}${postId ? '/single.json' : '/all.json'}`, {
    //   cancelToken: Canceler.token,
    //   params: {}
    // });
    // // // console.log(data);
    // const data = [
    //   {
    //     createdAt: "2021-11-30T16:26:32.670Z",
    //     title: "The New Whitelabel CMS",
    //     content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //     image: "https://s27389.pcdn.co/wp-content/uploads/2022/02/nft-use-cases-for-businesses-1024x440.jpeg.optimal.jpeg"
    //   }
    // ];
    // // // console.log(configuration);
    const News = Moralis.Object.extend("News");
    const query = new Moralis.Query(News);
    query.equalTo("appId", configuration.appId);
    const data = postId ? await query.first() : await query.find();
    // // // console.log(data);

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
    // // // console.log(data);

    dispatch(actions.getRecentPosts.success(data));
  } catch (err) {
    dispatch(actions.getRecentPosts.failure(err));
  }
};
