import React, { useContext } from 'react';
import { Grid, Paper, Button } from '@mui/material';
import moment from 'moment';
import { DappifyContext } from 'react-dappify';
import ImageFadeIn from "react-image-fade-in";
import { constants } from 'react-dappify';
import isEmpty from 'lodash/isEmpty';

const ActivityItem = ({nft, index}) => {
    const { configuration } = useContext(DappifyContext);
    const network = constants.NETWORKS[configuration.chainId];

    const getExplorerUrl = () => {
        return `${network.blockExplorerUrls[0]}/tx/${nft.hash}`;
    }

    const getOwnerUrl = () => {
        return `/profile/${nft.owner.wallet}`;
    }

    const hasTransaction = () => !isEmpty(nft.hash);

    return (
        <Grid item xs={12} className="act_sale onStep fadeIn" key={index}>
            <Paper sx={{ p: 4, display: 'flex', width: '100%' }} elevation={7}>
            <Grid item>
                {nft.metadata.image && 
                    <ImageFadeIn height="auto" width="80px" src={nft.metadata.image} alt=""/>}
            </Grid>
            <Grid item sx={{ ml: 2 }}>
                <h4>{nft.metadata.name}</h4>
                <h6>Item {nft.collection.name} #{nft.tokenId} with status {nft.status} latest update {moment(nft.updatedAt).format('MM/DD/YYYY')}</h6>
                <h6>by <a target="_blank" href={getOwnerUrl()} rel="noreferrer">{nft.owner.username}</a> with price {nft.price} {network?.nativeCurrency?.symbol} {nft.buyer && (`purchased by ${nft.buyer.username}`)} {hasTransaction() && <Button sx={{ height:15 }} target="_blank" href={getExplorerUrl()}>View in explorer</Button>}</h6>
            </Grid>
            </Paper>
        </Grid>
    );
}

export default ActivityItem;
