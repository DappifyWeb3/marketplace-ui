import React, { memo } from 'react';
import NFTCard from 'components/NFTCard';
import { Grid } from '@mui/material';

//react functional component
const NTFGridContainer = ({ t, nfts=[], hasMore=false, onLoadMore=()=>{}, sizes={xs:12, sm:6, md: 4, lg:3, xl: 2} }) => {

    const renderCards = () => {
        const cards = [];
        nfts.forEach((nft, index) => {
            cards.push(
                <Grid item xs={sizes.xs} sm={sizes.sm} md={sizes.md} lg={sizes.lg} xl={sizes.xl} key={index} sx={{ p:0, m:0 }}>
                    <NFTCard nft={nft} key={nft.id} t={t}/>
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
                    <span onClick={onLoadMore} className="btn-main lead m-auto">{t('Load More')}</span>
                </div>
            }
        </Grid>              
    );
};

export default memo(NTFGridContainer);