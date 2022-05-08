import { 
    createAction as action, 
    createAsyncAction as asyncAction 
} from 'typesafe-actions';

export const getTokenPrice = asyncAction(
    'project/GET_TOKEN_PRICE',
    'project/GET_TOKEN_PRICE_SUCCESS',
    'project/GET_TOKEN_PRICE_FAIL'
)();

export const fullTextSearch = asyncAction(
    'nft/FULL_TEXT_SEARCH',
    'nft/FULL_TEXT_SEARCH_SUCCESS',
    'nft/FULL_TEXT_SEARCH_FAIL'
)();

export const withdrawNft = asyncAction(
    'nft/WITHDRAW_NFT',
    'nft/WITHDRAW_NFT_SUCCESS',
    'nft/WITHDRAW_NFT_FAIL',
    'nft/WITHDRAW_NFT_CANCEL'
)();

export const editPriceNft = asyncAction(
    'nft/EDIT_PRICE_NFT',
    'nft/EDIT_PRICE_NFT_SUCCESS',
    'nft/EDIT_PRICE_NFT_FAIL',
    'nft/EDIT_PRICE_NFT_CANCEL'
)();

export const saveNft = asyncAction(
    'nft/SAVE_NFT',
    'nft/SAVE_NFT_SUCCESS',
    'nft/SAVE_NFT_FAIL'
)();

export const sellNft = asyncAction(
    'marketplace/SELL_NFT',
    'marketplace/SELL_NFT_SUCCESS',
    'marketplace/SELL_NFT_FAIL',
    'marketplace/SELL_NFT_CANCEL'
)();

export const purchaseNft = asyncAction(
    'nft/PURCHASE_NFT',
    'nft/PURCHASE_NFT_SUCCESS',
    'nft/PURCHASE_NFT_FAIL',
    'nft/PURCHASE_NFT_CANCEL'
)();

export const bidNft = asyncAction(
    'nft/BID_NFT',
    'nft/BID_NFT_SUCCESS',
    'nft/BID_NFT_FAIL'
)();

export const likeNft = asyncAction(
    'nft/LIKE_NFT',
    'nft/LIKE_NFT_SUCCESS',
    'nft/LIKE_NFT_FAIL'
)();

export const getNfts = asyncAction(
    'nft/GET',
    'nft/GET_SUCCESS',
    'nft/GET_FAIL'
)();

export const getNftAuctions = asyncAction(
    'nft/GET_NFT_AUCTIONS',
    'nft/GET_NFT_AUCTIONS_SUCCESS',
    'nft/GET_NFT_AUCTIONS_FAIL'
)();

export const getNftLikes = asyncAction(
    'nft/GET_NFT_LIKES',
    'nft/GET_NFT_LIKES_SUCCESS',
    'nft/GET_NFT_LIKES_FAIL'
)();

export const getNftBreakdown = asyncAction(
    'nft/GET_NFT_BREAKDOWN',
    'nft/GET_NFT_BREAKDOWN_SUCCESS',
    'nft/GET_NFT_BREAKDOWN_FAIL'
)();

export const getNftsFromCollection = asyncAction(
    'nft/GET_NFT_FROM_COLLECTION',
    'nft/GET_NFT_FROM_COLLECTION_SUCCESS',
    'nft/GET_NFT_FROM_COLLECTION_FAIL'
)();

export const getNftsFromUser = asyncAction(
    'nft/GET_NFT_FROM_USER',
    'nft/GET_NFT_FROM_USER_SUCCESS',
    'nft/GET_NFT_FROM_USER_FAIL'
)();

export const getNftShowcase = asyncAction(
    'nft/GET_NFT_SHOWCASE',
    'nft/GET_NFT_SHOWCASE_SUCCESS',
    'nft/GET_NFT_SHOWCASE_FAIL'
)();

export const getNftDetail = asyncAction(
    'nft/GET_NFT_DETAIL',
    'nft/GET_NFT_DETAIL_SUCCESS',
    'nft/GET_NFT_DETAIL_FAIL'
)();

export const getCollection = asyncAction(
    'nft/GET_COLLECTION',
    'nft/GET_COLLECTION_SUCCESS',
    'nft/GET_COLLECTION_FAIL'
)();

export const getHotCollections = asyncAction(
    'nft/GET_HOT_COLLECTIONS',
    'nft/GET_HOT_COLLECTIONS_SUCCESS',
    'nft/GET_HOT_COLLECTIONS_FAIL'
)();

export const getMyCollections = asyncAction(
    'nft/GET_MY_COLLECTIONS',
    'nft/GET_MY_COLLECTIONS_SUCCESS',
    'nft/GET_MY_COLLECTIONS_FAIL'
)();

export const saveCollection = asyncAction(
    'nft/SAVE_COLLECTIONS',
    'nft/SAVE_COLLECTIONS_SUCCESS',
    'nft/SAVE_COLLECTIONS_FAIL'
)();

export const getUser = asyncAction(
    'nft/GET_USER',
    'nft/GET_USER_SUCCESS',
    'nft/GET_USER_FAIL'
)();

export const getUserRanking = asyncAction(
    'nft/GET_USER_RANKING',
    'nft/GET_USER_RANKING_SUCCESS',
    'nft/GET_USER_RANKING_FAIL'
)();

export const getCurrentUser = asyncAction(
    'nft/GET_USER_CURRENT',
    'nft/GET_USER_CURRENT_SUCCESS',
    'nft/GET_USER_CURRENT_FAIL'
)();

export const saveCurrentUser = asyncAction(
    'nft/SAVE_USER_CURRENT',
    'nft/SAVE_USER_CURRENT_SUCCESS',
    'nft/SAVE_USER_CURRENT_FAIL'
)();

export const getBlogPosts = asyncAction(
    'nft/GET_BLOG_POSTS',
    'nft/GET_BLOG_POSTS_SUCCESS',
    'nft/GET_BLOG_POSTS_FAIL'
)();

export const getRecentPosts = asyncAction(
    'nft/GET_RECENT_POSTS',
    'nft/GET_RECENT_POSTS_SUCCESS',
    'nft/GET_RECENT_POSTS_FAIL'
)();

export const getTags = asyncAction(
    'nft/GET_TAGS',
    'nft/GET_TAGS_SUCCESS',
    'nft/GET_TAGS_FAIL'
)();

export const getComments = asyncAction(
    'nft/GET_COMMENTS',
    'nft/GET_COMMENTS_SUCCESS',
    'nft/GET_COMMENTS_FAIL'
)();

export const clearNfts = action('nft/CLEAR_ALL_NFTS')();
export const clearFilter = action('nft/CLEAR_FILTER')();
export const filterCategories = action('nft/FILTER_CATEGORIES')();
export const filterStatus = action('nft/FILTER_STATUS')();
export const filterItemsType = action('nft/FILTER_ITEMS_TYPE')();
export const filterCollections = action('nft/FILTER_COLLECTIONS')();
export const filterNftTitle = action('nft/FILTER_NFT_TITLE')();