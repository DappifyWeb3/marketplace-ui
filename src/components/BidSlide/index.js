import React, { useState, useContext } from "react";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { DappifyContext } from "react-dappify";
import UserAvatar from "components/UserAvatar";
import { Grid, Typography, Button } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { useNavigate } from '@reach/router';
import ModalPurchase from 'components/ModalPurchase';
import { useTranslation } from 'react-i18next';

const BidSlide = ({nft, usdPrice}) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    const { project} = useContext(DappifyContext);
    const network = project?.getNetworkContext('marketplace');
    const [openCheckoutbid, setOpenCheckoutbid] = useState();

    return (
        <div className="nft__item_lg">
            <div className="row align-items-center">
                <div className="col-lg-6" style={{ padding: '20px' }}>
                    <div className="super__size" style={{
                            background: `url(${nft.metadata.image})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover'
                        }}>
                    </div>
                    {nft?.metadata?.animation_url && <audio src={nft.metadata.animation_url} controls controlsList="nodownload" className="audio__controller">
                        {t('Your browser does not support the audio element')}
                    </audio>}
                </div>
                <div className="col-lg-6">
                    <div className="d-desc">
                        <h2>{nft.metadata.name}</h2>
                        <div className="d-author">
                            <Grid container direction="row" justify="left" spacing={1}>
                                <Grid item>
                                    <UserAvatar user={nft.owner} />
                                </Grid>
                                <Grid item>  
                                    <Grid container direction="column" justify="left" spacing={1}>
                                        <Grid item>
                                            <Typography fontWeight="900"   
                                                        sx={{ 
                                                            fontSize: "16px", 
                                                            fontWeight: '600',
                                                            "&:hover": {
                                                                color: theme.palette.primary.main,
                                                                cursor: 'pointer'
                                                            }
                                                        }} 
                                                        onClick={() => navigate(`/profile/${nft.owner.wallet}`)}>
                                                {nft.owner.username}
                                            </Typography>
                                        </Grid>
                                    </Grid>                             
                                </Grid>
                            </Grid>
                        </div>
                        <div className="d-attr">
                            <div className='col first'>
                                <span className="d-title">{t('Price')}</span>
                                {nft.price > 0 ? (<h3>{nft.price.toFixed(3)} {network.nativeCurrency.symbol}</h3>) : <h3>{t('Not for sale')}</h3>}
                                <h5>(${`${(nft.price * usdPrice).toFixed(2)}`})</h5>
                            </div>
                            <div className="line"></div>
                        </div>
                        <div className="spacer-10"></div>
                        <div className="d-buttons">
                            <Button sx={{ mr: 2, fontSize: '1.25em' }} variant="contained" size="large" onClick={() => setOpenCheckoutbid(true)}>{t('Purchase')}</Button>
                            <Button sx={{ fontSize: '1.25em' }} variant="contained" size="large" onClick={() => navigate(`/item/${nft.collection.address}/${nft.tokenId}`)}>{t('View artwork')}</Button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalPurchase t={t} nft={nft} isOpen={openCheckoutbid} onClose={() => {setOpenCheckoutbid(false);}}  />
        </div>
    );
  };

export default BidSlide;