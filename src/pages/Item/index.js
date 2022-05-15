import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Footer from 'components/Segment/Footer';
import * as selectors from 'store/selectors';
import { fetchNftDetail } from "store/actions/thunks";
import { Grid, Button } from '@mui/material';
import ImageFadeIn from "react-image-fade-in";
import ActivityItem from "components/ActivityItem";
import ModalPurchase from "components/ModalPurchase";


const ItemDetail = ({ contractAddress, tokenId, t }) => {
    const [openDetails, setOpenDetails] = React.useState(true);
    const [openHistory, setOpenHistory] = React.useState(false);
    const dispatch = useDispatch();
    const nftDetailState = useSelector(selectors.nftDetailState);
    const nftHistory = nftDetailState.data ? nftDetailState.data : [];
    const nft = nftHistory[0] || {};
    const [openCheckout, setOpenCheckout] = React.useState(false);
    const [openCheckoutbid, setOpenCheckoutbid] = React.useState(false);

    useEffect(() => {
        dispatch(fetchNftDetail(contractAddress, tokenId));
    }, [dispatch, contractAddress, tokenId]);

    const imageUrl = nft?.metadata?.image;

    const renderAttributes = () => {
        const attrs = [];
        const nftAttributes = nft?.metadata?.attributes;
        if (nftAttributes) {
            nftAttributes.forEach((attr, index) => {
                attrs.push(
                    <Grid item xs={12} md={6} lg={4} xl={3} className="nft_attr" key={index}>
                        <h5>{attr.display}</h5>
                        <h4>{attr.value}</h4>
                    </Grid>
                )
            })
        }
        return attrs;
    };

    const toggleDetails = () => {
        setOpenDetails(!openDetails);
        setOpenHistory(!openHistory);
    };
    const renderActivity = () => {
        const list = [];
        nftHistory.forEach((nft, index) => {
          list.push(<ActivityItem nft={nft} key={index} />);
        });
        return list;
      }

    return (
        <div className="theme-background">
            <section className='container'>
                <div className='row mt-md-5 pt-md-4'>
                    <div className="col-md-6 text-center">
                        {imageUrl && <ImageFadeIn height="auto" width="100%" src={imageUrl} alt=""/> }
                        {nft?.metadata?.animation_url && <audio src={nft.metadata.animation_url} controls controlsList="nodownload" className="audio__controller">
                            Your browser does not support the audio element.
                        </audio>}
                        {nft?.metadata?.youtube_url && (<iframe style={{ marginTop: '20px' }} title={nft.metadata.name} width="100%" height="375" src={nft.metadata.youtube_url} />) }
                    </div>
                    <div className="col-md-6">
                        <div className="item_info">

                            <h2>{nft?.metadata?.name}</h2>
                            <div className="item_info_counts">
                                <div className="item_info_type"><i className="fa fa-image"></i>{nft.category}</div>
                                <div className="item_info_views"><i className="fa fa-eye"></i>{nft.views}</div>
                                <div className="item_info_like"><i className="fa fa-heart"></i>{nft.likes}</div>
                            </div>
                            <p>{nft?.metadata?.description}</p>


                            <div className="spacer-40"></div>

                            <div className="de_tab">

                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                    <Button variant={openDetails ? "contained" : "outlined"} onClick={toggleDetails}>{t('Details')}</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant={openHistory ? "contained" : "outlined"} onClick={toggleDetails}>{t('History')}</Button>
                                </Grid>
                            </Grid>

                            <ul className="de_nav">
                                <li id='Mainbtn0' className="active">
                                   
                                </li>
                                <li id='Mainbtn1' className=''>
                                    
                                </li>
                            </ul>
                                        
                            <div className="de_tab_content">
                                {openDetails  && (  
                                <div className="tab-1 onStep fadeIn">
                                    <div className="d-block mb-3">
                                        <div className="mr40">
                                            <h6>{t('Owner')}</h6>
                                            <div className="item_author">                                    
                                                <div className="author_list_pp">
                                                    <span>
                                                        <img className="lazy" src={nft?.owner?.image} alt=""/>
                                                        <i className="fa fa-check"></i>
                                                    </span>
                                                </div>                                    
                                                <div className="author_list_info">
                                                    <span>{nft?.author?.username}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Grid container>
                                            {renderAttributes()}
                                        </Grid>
                                    </div>
                                </div>
                                )}

                                {openHistory && ( 
                                    <Grid container spacing={2} justifyContent="center">
                                        {renderActivity()}
                                    </Grid>
                                )}

                                {/* button for checkout */}
                                <div className="d-flex flex-row mt-5">
                                    { nft.status === 'OfferingPlaced' && <Button fullWidth sx={{ marginTop: 5 }} size="large" variant="contained" onClick={() => setOpenCheckout(true)}>{t('Purchase')}</Button> }
                                   {/* } <button className='btn-main btn2 lead mb-5' onClick={() => setOpenCheckoutbid(true)}>Place Bid</button> */}
                                </div>
                            </div>     
                        </div>          
                    </div>
                </div>
            </div>
        </section>
        <Footer t={t}/> 
        <ModalPurchase t={t} nft={nft} isOpen={openCheckout || openCheckoutbid} onClose={() => { setOpenCheckout(false); setOpenCheckoutbid(false);}} isBid={openCheckoutbid} />

        </div>
    );
}

export default memo(ItemDetail);