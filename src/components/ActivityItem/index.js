import React, { useEffect, useContext } from 'react';
import Footer from 'components/Segment/Footer';
import { createGlobalStyle } from 'styled-components';
import { Grid, Button, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../store/selectors';
import { fetchNfts } from 'store/actions/thunks';
import moment from 'moment';
import { DappifyContext } from 'react-dappify';
import ImageFadeIn from "react-image-fade-in";

const ActivityItem = ({nft, index}) => {
    const dispatch = useDispatch();
    const { configuration, project } = useContext(DappifyContext);
    const nftItems = useSelector(selectors.nftsState);
    const nfts = nftItems?.data ? nftItems.data : [];
    const network = project.getNetworkContext('marketplace');
    return (
        <Grid item xs={12} className="act_sale onStep fadeIn" key={index}>
            <Paper sx={{ p: 4, display: 'flex', width: '100%' }} elevation={7}>
            <Grid item>
                {nft.metadata.image && 
                    <ImageFadeIn height="auto" width="80px" src={nft.metadata.image} alt=""/>}
            </Grid>
            <Grid item sx={{ ml: 2 }}>
                <h4>{nft.metadata.name}</h4>
                <h6>Item {nft.collection.name} #{nft.tokenId} with status {nft.status} latest update {moment(nft.updatedAt).format('MM/DD/YYYY')} by <span className='color'>{nft.owner.username}</span></h6>
                <h6>with price {nft.price} {network?.nativeCurrency?.symbol} {nft.buyer && (`purchased by ${nft.buyer.username}`)}</h6>
            </Grid>
            </Paper>
        </Grid>
    );
}

export default ActivityItem;
