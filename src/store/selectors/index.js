import { createSelector, createStructuredSelector } from "reselect";


//Store Selectors
export const nftBreakdownState = (state) => state.NFT.nftBreakdown;
export const nftShowcaseState = (state) => state.NFT.nftShowcase;
export const nftDetailState = (state) => state.NFT.nftDetail;
export const nftsFromCollection = (state) => state.NFT.nftsFromCollection;
export const nftsFromUser = (state) => state.NFT.nftsFromUser;
export const nftLikes = (state) => state.NFT.nftLikes;
export const nftAuctions = (state) => state.NFT.nftAuctions;
export const nftsState = (state) => state.NFT.nfts;
export const hotCollectionsState = (state) => state.collections.hotCollections;
export const myCollectionsState = (state) => state.collections.myCollections;
export const collectionState = (state) => state.collections.collection;
export const fullTextSearchResultState = (state) => state.NFT.fullTextSearchResults;
export const nftWithdrawState = (state) => state.NFT.withdraw;
export const nftPurchaseState = (state) => state.NFT.purchase;
export const nftEditState = (state) => state.marketplace.edit;
export const nftSellState = (state) => state.marketplace.sell;

export const projectPriceState = (state) => state.project.tokenPrice;

// Users
export const authorState = (state) => state.users.user;
export const authorRankingsState = (state) => state.users.rankings;
export const currentUserState = (state) => state.users.current;

//blogs
export const blogsState = (state) => state.blogs.blogPosts;
export const recentPostsState = (state) => state.blogs.recentPosts;
export const tagsState = (state) => state.blogs.tags;
export const commentsState = (state) => state.blogs.comments;

//loader
export const isLoading = (state) => {
    return  state.collections.save.loading ||
            state.NFT.save.loading ||
            state.users.save.loading;
}

export const isSuccess = (state) => {
    return  !state.collections.save.loadFailed;
}

export const isError = (state) => {
    if (state.collections.save.loadFailed) return state.collections.save.error;
    if (state.marketplace.sell.loadFailed) return state.marketplace.sell.error;
}

export const auctionedNfts = createSelector(nftBreakdownState, ( nfts ) => {
    if(!nfts.data) {
        return [];
    }
    const acutioned = nfts.data.filter(nft => !!nft.deadline);
    return acutioned;
});

export const nftFilter = createStructuredSelector({
    categories: (state) => state.filters.selectedCategories,
    status: (state) => state.filters.selectedStatus,
    itemsType: (state) => state.filters.selectedItemsType,
    collections: (state) => state.filters.selectedCollections,
    nftTitle: (state) => state.filters.filterNftTitle
});

export const nftItems = createSelector(nftFilter, nftBreakdownState, ( filters, nfts ) => {
    let { data } = nfts;
    const { categories, status, itemsType, collections, nftTitle } = filters;
    
    if(!data) {
        return [];
    }

    if(categories.size) {
        data = data.filter( nft => categories.has(nft.category));
    }
    if(status.size) {
        data = data.filter( nft => status.has(nft.status));
    }
    if(itemsType.size) {
        data = data.filter( nft => itemsType.has(nft.item_type));
    }
    if(collections.size) {
        data = data.filter( nft => collections.has(nft.collections));
    }
    if(nftTitle.trim().length) {
        let pattern = new RegExp(`${nftTitle.trim()}`, 'gi');
        data = data.filter( nft => nft.title.match(pattern));
    }

    return data;
});