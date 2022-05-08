import React, { memo } from 'react';
import NFTCard from 'components/NFTCard';
import { Grid } from '@mui/material';

//react functional component
const NTFGridContainer = ({ t, nfts=[], hasMore=false, onLoadMore=()=>{}, sizes={xs:12, sm:6, md: 4, lg:3, xl: 2} }) => {
    // const { configuration, Provider } = useContext(DappifyContext);
    // const dispatch = useDispatch();
    // const nftItems = useSelector(selectors.nftsState);
    // const nfts = nftItems?.data ? nftItems : [];
    // const [height, setHeight] = useState(0);

    // const onImgLoad = ({target:img}) => {
    //     let currentHeight = height;
    //     if(currentHeight < img.offsetHeight) {
    //         setHeight(img.offsetHeight);
    //     }
    // }
    
    // useEffect(() => {
    //     dispatch(actions.fetchNftsBreakdown(Provider, configuration, authorId));
    // }, [dispatch, authorId, Provider, configuration]);

    //will run when component unmounted
    // useEffect(() => {
    //     return () => {
    //         dispatch(clearFilter());
    //         dispatch(clearNfts());
    //     }
    // },[dispatch]);

    // const loadMore = () => {
    //     dispatch(actions.fetchNftsBreakdown(Provider, configuration, authorId));
    // }

    const renderCards = () => {
        const cards = [];
        nfts.forEach((nft, index) => {
            cards.push(
                <Grid item xs={sizes.xs} sm={sizes.sm} md={sizes.md} lg={sizes.lg} xl={sizes.xl} key={index} sx={{ p:0, m:0 }}>
                    <NFTCard nft={nft} key={nft.id}  t={t}/>
                </Grid>
            );
        });
        return cards;
    };

    return (
        <Grid container spacing={3} className="onStep fadeIn">
            {renderCards()}
            { hasMore && nfts.length <= 20 &&
                <div className='col-lg-12'>
                    <div className="spacer-single"></div>
                    <span onClick={onLoadMore} className="btn-main lead m-auto">Load More</span>
                </div>
            }
        </Grid>              
    );
};

export default memo(NTFGridContainer);