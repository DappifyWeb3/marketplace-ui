import React, { useContext } from 'react';
import { Grid, Paper } from '@mui/material';
import moment from 'moment';
import { DappifyContext } from 'react-dappify';
import ImageFadeIn from "react-image-fade-in";

const ActivityItem = ({nft, index}) => {
    const { project } = useContext(DappifyContext);
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
