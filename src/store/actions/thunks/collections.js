import * as actions from '../../actions';
import Collection from 'react-dappify/model/Collection';

export const saveCollection = (collection, imageFile) => async(dispatch) => {
  dispatch(actions.saveCollection.request());
  try {
    await collection.setImage(imageFile);
    await collection.save();
    dispatch(actions.saveCollection.success(collection));
    dispatch(fetchMyCollections());
  } catch (err) {
    dispatch(actions.saveCollection.failure(err));
  }
};

export const fetchCollection = (shortUrl) => async (dispatch) => {
  dispatch(actions.getCollection.request());

  try {
    const data = await Collection.getCollection(shortUrl);
    dispatch(actions.getCollection.success(data));
  } catch (err) {
    dispatch(actions.getCollection.failure(err));
  }
};

export const fetchHotCollections = (collectionId) => async (dispatch) => {
  dispatch(actions.getHotCollections.request());

  try {
    const data = await Collection.getHotCollections();
    dispatch(actions.getHotCollections.success(data));
  } catch (err) {
    dispatch(actions.getHotCollections.failure(err));
  }
};

export const fetchMyCollections = () => async (dispatch) => {
  dispatch(actions.getMyCollections.request());

  try {
    const data = await Collection.getCurrentUserCollections();
    dispatch(actions.getMyCollections.success(data));
  } catch (err) {
    dispatch(actions.getMyCollections.failure(err));
  }
};