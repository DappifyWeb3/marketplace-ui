import React, { memo } from 'react';
import NFTCard from 'components/NFTCard';
import { Grid } from "@mui/material";

const NFTGrid = ({ nfts, onLoadMore, t}) => {
    // const { configuration, Provider } = useContext(DappifyContext);
    // const dispatch = useDispatch();

    // const nftItems = useSelector(selectors.nftItems);

    // const [height, setHeight] = useState(0);

    // const onImgLoad = ({target:img}) => {
    //     let currentHeight = height;
    //     if(currentHeight < img.offsetHeight) {
    //         setHeight(img.offsetHeight);
    //     }
    // }
    
    // useEffect(() => {
    //     dispatch(actions.fetchNftsBreakdown(Provider, configuration));
    // }, [dispatch]);

    // //will run when component unmounted
    // useEffect(() => {
    //     return () => {
    //         dispatch(clearFilter());
    //         dispatch(clearNfts());
    //     }
    // },[dispatch]);
    
    // const loadMore = () => {
    //     dispatch(actions.fetchNftsBreakdown(Provider, configuration));
    // }
    
  return (
    <Grid container spacing={2}>
        {nfts && nfts.map( (nft, index) => (
            <Grid item xs={12} sm={6} md={3}>
                <NFTCard nft={nft} key={index} className="d-item" t={t} />
            </Grid>
                ))}
        { nfts.length <= 20 &&
            <Grid item xs={12}>
                <div className="spacer-single"></div>
                <span onClick={onLoadMore} className="btn-main lead m-auto">Load More</span>
            </Grid>
        }
        </Grid>           
    );
}

export default memo(NFTGrid);